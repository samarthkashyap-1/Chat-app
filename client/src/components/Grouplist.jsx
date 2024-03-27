import React, { useEffect, useState } from "react";
import { getUserbyId } from "../Apis/api";
import del from "../assets/DELETE.png";


const Chatlist = ({ chats, setGroupActive, setTalkingTo, onlineUsers }) => {
  const [groupChat, setGroupChat] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));


  const groupChatHandler = async () => {
    setGroupActive(chats);
    // setTalkingTo(chat);
  };

  return (
    <div className="w-full h-14 border-b-2 flex items-center justify-between cursor-pointer hover:bg-gray-200">
      <div className="w-full" onClick={() => groupChatHandler(chats)}>
        {groupChat && <h1 className="text-xl font-semibold">{chats.name}</h1>}
      </div>

      <img src={del} alt="" className="scale-75" />
    </div>
  );
};

export default Chatlist;
