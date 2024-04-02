const { Server } = require("socket.io");


let onlineUsers = [];
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});



io.on("connection", (socket) => {
  //

  // listen to the connected user
  socket.on("newUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
      console.log(onlineUsers);
      //
      io.emit("getOnlineUsers", onlineUsers); // Emit updated online users list to all clients
    }
  });

  // listen to the disconnected user
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers); // Emit updated online users list to all clients
  });

  // listen to the message
  socket.on("sendMessage", (data) => {
    const receiver = onlineUsers.find(
      (user) => user.userId === data.receiverId
    );

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      io.to(receiver.socketId).emit("getNotification", {
        sender: data.sender,
        receiver: data.receiverId,
        message: data.message,
        date : new Date(),
       isRead : false
      })
      


    }
  });
});

// group chat

const GetUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return timestamp + random;
};

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    //

    socket.join(room);
  });

  socket.on("sendGroupMessage", (data) => {
    const messageId = GetUniqueId();
    io.to(data.room).emit("getGroupMessage", { ...data, messageId });
  });
});

// send message to multiple users
io.on("connection", (socket) => {
  socket.on("sendMessagetoMultipleUsers", (data) => {
    data.receiverID.map(async (receiver) => {
      console.log(onlineUsers);
      const rec = onlineUsers.find((user) => user.userId === receiver.id);
      if (!rec) return;
      const savedMessage = {
        sender: data.sender,
        receiver: receiver.id,
        message: data.message,
        messagetype: data.messagetype,
      };
      console.log(savedMessage);
      // console.log(rec.socketId);

      io.to(rec.socketId).emit("getMessage", savedMessage); // Emit "receiveMessage" event directly
    });
  });
});


io.listen(3001);
