import React, { useEffect, useState } from "react";
import { getUserbyId } from "../Apis/api";
import del from "../assets/DELETE.png";

const Chatlist = ({ chats, setChatingto, setTalkingTo, onlineUsers }) => {
  const [receiver, setReceiver] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const receiverId = chats.members.find((id) => id !== user.id);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserbyId(receiverId);
      setReceiver(user);
    };
    if (receiverId) {
      fetchUser();
    }
  }, [receiverId]);

  const getChatId = (chats) => {
    setChatingto(chats);
    setTalkingTo(receiver);
  };



  return (
    <div className="w-full h-14 border-b-2 flex items-center justify-between cursor-pointer hover:bg-gray-200">
      <div className="flex w-full" onClick={() => getChatId(chats)}>
        {receiver && (
          <h1 className="text-xl font-semibold">{receiver[0].name}</h1>
        )}
        {onlineUsers.some((user) => user.userId === receiverId) && (
          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
        )}
      </div>

      <img src={del} alt="" className="scale-75" />
    </div>
  );
};

export default Chatlist;
