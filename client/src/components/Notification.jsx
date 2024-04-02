import React, { useEffect, useContext, useState } from "react";
import notification from "../assets/messenger.png";
import moment from "moment";
import { SocketContext } from "../Apis/SocketProvider";

const Notification = ({
  allNotification,
  setAllNotification,
  allUser,
  chatingto,
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { socket } = useContext(SocketContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!socket) return;

    socket.on("getNotification", (data) => {
      const NotificationWithName = {
        ...data,
        senderName: allUser.find((val) => val.id === data.sender).name,
      };

      console.log(NotificationWithName);

      const isChatOpen = chatingto?.members?.includes(data.sender);

      console.log(isChatOpen);

      if (!isChatOpen) {
        NotificationWithName.isRead = false;
      } else {
        NotificationWithName.isRead = true;
      }

      setAllNotification((prev) => [...prev, NotificationWithName]);
      //
    });

    return () => {
      if (socket) {
        socket.off("getNotification");
      }
    };
  }, [socket, allUser, chatingto]);

  console.log(allNotification);

  return (
    <>
      {user && (
        <div className="relative z-50 ">
          <img
            src={notification}
            alt="notification"
            className="w-7 h-7 mt-1 mr-2 cursor-pointer "
            onClick={() => {
              setNotificationOpen(!notificationOpen);
            }}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">
            {allNotification.filter((val) => val.isRead == false).length}
          </span>

          <div
            className={`absolute bg-white w-72 overflow-y-auto rounded-lg shadow-lg ${
              notificationOpen ? "h-fit" : "h-0"
            }`}
          >
            {allNotification.map((val, key) => {
              if (val.isRead == false) {
                return (
                  <div
                    className={`w-full text-black h-fit border-b-2 flex flex-col p-2  cursor-pointer ${
                      val.isRead ? "bg-gray-200" : "bg-blue-200"
                    } `}
                  >
                    <h1 className="font-semibold">
                      {val.senderName} sent you a new message
                    </h1>
                    <h1 className="text-sm">{moment(val.date).fromNow()}</h1>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
