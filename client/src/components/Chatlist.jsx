import React, { useEffect, useState } from "react";
import { getUserbyId } from "../Apis/api";
import del from "../assets/DELETE.png";

const Chatlist = ({
  chats,
  setChatingto,
  setTalkingTo,
  onlineUsers,
  allNotification,
  setAllNotification,
}) => {
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
  // console.log(allNotification);

  return (
    <div className="w-full h-14 border-b-2 flex items-center justify-between cursor-pointer hover:bg-gray-200">
      <div className="flex w-full" onClick={() => {getChatId(chats)
      
      allNotification.map((val) => {
        if (val.sender === receiverId && !val.isRead) {
          val.isRead = true;
        }
        return val;

      })
      }
      
      }>
        {receiver && (
          <h1 className="text-xl font-semibold">{receiver[0].name}</h1>
        )}
        {onlineUsers.some((user) => user.userId === receiverId) && (
          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
        )}
      </div>

      <div>
        {allNotification.filter(
          (notification) =>
            notification.sender === receiverId && !notification.isRead
        ).length > 0 && (
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {
              allNotification.filter(
                (notification) =>
                  notification.sender === receiverId && !notification.isRead
              ).length
            }
          </div>
        )}
      </div>

      {/* <img src={del} alt="" className="scale-75" /> */}
    </div>
  );
};

export default Chatlist;
