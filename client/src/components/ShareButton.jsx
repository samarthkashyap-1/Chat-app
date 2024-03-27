import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Apis/Context";
import share from "../assets/share.png";
import { getAlluser, sendMessagetoMultipleUsers } from "../Apis/api";
import { SocketContext } from "../Apis/SocketProvider";

const ShareButton = () => {
  const [allUser, setAllUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const {socket} = useContext(SocketContext);
  const { dataToSend, setDataToSend } = useContext(Context);

  useEffect(() => {
    const fetchAllUser = async () => {
      const user = await getAlluser();
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const filteredUser = user.filter((val) => val.id !== currentUser?.id);
      setAllUser(filteredUser);
    };
    fetchAllUser();
  }, []);

  const toggleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser !== user)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const HandleShare = async () => {
   try {
    setLoader(true);
     const user = JSON.parse(localStorage.getItem("user"));
     const message = {
       sender: user.id,
       receiverID: selectedUsers,
       message: dataToSend || "No message",
       messagetype: "text",
     };
     console.log(socket);
     const newMessage = await sendMessagetoMultipleUsers(message);

     socket.emit("sendMessagetoMultipleUsers", message);
   } catch (error) {
        console.log(error);
   }finally{

    setLoader(false);
    setShowModal(!showModal);
    setSelectedUsers([]);

    }
  };

  return (
    <>
      <div
        className="size-8 rounded-full my-auto mx-5 z-40  border-black border-2 p-1 "
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <img src={share} alt="" />
      </div>

      {showModal && (
        <div className="absolute z-50 top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <div className="flex justify-between ">
              <h1 className="text-xl font-bold">Select users to share</h1>
              <p
                className="text-red-500 cursor-pointer text-2xl"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                X
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {allUser.map((user) => (
                <div
                  key={user.id}
                  className={`p-2 border
                  cursor-pointer rounded-lg ${
                    selectedUsers.includes(user) ? "bg-blue-200" : ""
                  }`}
                  onClick={() => toggleUserSelection(user)}
                >
                  {user.name}
                </div>
              ))}
            </div>
            <button
              onClick={HandleShare}
              className="bg-blue-500 text-white p-2 rounded-lg mt-2"
              disabled={loader}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
