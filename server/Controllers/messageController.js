const Message = require("../Models/messageModel");
const groupMessage = require("../Models/groupMessageModal");
const Chat = require("../Models/chatModel");

const createMessage = async (req, res) => {
  const { chatId, message, sender, messagetype, filename, filepath } = req.body;

  try {
    const newMessage = new Message({
      filename,
      chatId,
      message,
      messagetype,
      filepath,
      sender,
    });

    const savedMessage = await newMessage.save();

    res.json(savedMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await Message.find({ chatId });
    res.json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createGroupMessage = async (req, res) => {
  const { groupId, message, sender, messagetype, filename, filepath } =
    req.body;

  try {
    const newMessage = new groupMessage({
      filename,
      messagetype,
      filepath,
      message,
      sender,
      groupId,
    });

    const savedMessage = await newMessage.save();

    res.json(savedMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getGroupMessages = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const messages = await groupMessage.find({ groupId });
    res.json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const sendMessagetoMultipleUsers = async (req, res) => {
  const { sender, receiverID, message, messagetype, filename, filepath } =
    req.body;

  try {
   receiverID.map(async (receiver) => {

      console.log(receiver);

      const FindChat = await Chat.findOne({
        members: { $all: [sender, receiver.id] },
      });

      console.log(FindChat);

      if (!FindChat) {
        const newChat = new Chat({
          members: [sender, receiver.id],
        });
        await newChat.save();
      }

      const chatId = await Chat.findOne({
        members: { $all: [sender, receiver.id] },
      });
      console.log(chatId._id);

      const newMessage = new Message({
        filename,
        chatId: chatId._id,
        message,
        messagetype,
        filepath,
        sender,
      });

      const savedMessage = await newMessage.save();
      
      return;
    })
    res.json({ message: "Message sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createMessage,
  getMessages,
  createGroupMessage,
  getGroupMessages,
  sendMessagetoMultipleUsers,
};
