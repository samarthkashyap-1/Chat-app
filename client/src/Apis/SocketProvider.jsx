import React, { useEffect, useState, createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);

    socket.emit("newUser", JSON.parse(localStorage.getItem("user")).id);

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
      socket.off("getOnlineUsers");
    };
  }, []);


  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
