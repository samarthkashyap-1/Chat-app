import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getChats,
  getMessages,
  sendMessage,
  sendGroupMessage,
  getGroupMessages,
  getGroupChats,
  createGroupChat,
  getGroupChatById,
} from "../Apis/api";
import Chatlist from "../components/Chatlist";

import Grouplist from "../components/Grouplist";
import InputEmoji from "react-input-emoji";
import Message from "../components/Message";

import { uploadFile } from "../Apis/api";
import CreateGroup from "../components/CreateGroup";


import { SocketContext } from "../Apis/SocketProvider";

const Chat = ({ newChat }) => {
  const { socket, onlineUsers } = useContext(SocketContext);

  const [loading, setLoading] = useState(false);
  const [allGroupMember, setAllGroupMember] = useState([]);
  const [data, setData] = useState([]);
  const [chatingto, setChatingto] = useState("");
  const [messages, setMessages] = useState(null);
  const [messagetoSent, setMessagetoSent] = useState("");
  const [talkinTo, setTalkingTo] = useState("");

  const [groupActive, setGroupActive] = useState([]);

  const [groupChat, setGroupChat] = useState([]);
  const [file, setFile] = useState(null);
  
  const chatScroll = useRef();

  const uploadClick = useRef(null);
  const navigate = useNavigate();

  const gettingChats = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const chats = await getChats(user);
    setData(chats);
    //
  };

  const getAllGroupChats = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const chats = await getGroupChats(user.id);
    setGroupChat(chats);

    //
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    //
    gettingChats();
    getAllGroupChats();
  }, [navigate, newChat]);

  //

  useEffect(() => {
    if (groupActive.length === 0) return;

    const gettiingMember = async () => {
      const res = await getGroupChatById(groupActive.id);

      setAllGroupMember(res.members);

      console.log(res.members);
    };

    gettiingMember();
  }, [groupActive]);

  useEffect(() => {
    //
    const fetchChat = async () => {
      setLoading(true);
      const chat = await getMessages(chatingto.id);
      //
      setMessages(chat);
      setGroupActive("");

      setLoading(false);
    };

    if (chatingto) {
      fetchChat();
    }
  }, [chatingto]);

  useEffect(() => {
    const fetchGroupChat = async () => {
      setLoading(true);

      const chat = await getGroupMessages(groupActive.id);
      // (chat);
      setChatingto("");
      setMessages(chat);

      setLoading(false);
      //
    };

    if (groupActive) {
      fetchGroupChat();
    }

    //
  }, [groupActive]);

  const sendingMessage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const receiverId = chatingto?.members?.find((id) => id !== user.id);

    if (chatingto) {
      //
      const data = {
        chatId: chatingto.id,
        sender: JSON.parse(localStorage.getItem("user")).id,
        messagetype: "text",
        message: messagetoSent,
      };

      setMessages((prev) => [
        ...prev,
        {
          message: messagetoSent,
          sender: JSON.parse(localStorage.getItem("user")).id,
        },
      ]);

      const message = await sendMessage(data);

      socket.emit("sendMessage", { ...data, receiverId });
      return;
    }
    //
    else if (groupActive) {
      //

      const data = {
        groupId: groupActive.id,
        sender: JSON.parse(localStorage.getItem("user")).id,
        message: messagetoSent,
        messagetype: "text",
        room: groupActive.id,
      };

      socket.emit("sendGroupMessage", data);

      const message = await sendGroupMessage(data);
      return;
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", groupActive.id);
  }, [groupActive]);

  // sending message

  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
      //
    });

    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  });

  useEffect(() => {
    if (!socket) return;

    //

    socket.on("getGroupMessage", (data) => {
      setMessages((prev) => [...prev, data]);

      //
    });

    return () => {
      if (socket) {
        socket.off("getGroupMessage");
      }
    };
  }, [socket, groupActive, chatingto]);

  // File upload

  const handleFileUpload = () => {
    uploadClick.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) return;
    const uploading = async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      const response = await uploadFile(formData);

      if (chatingto) {
        const data = {
          chatId: chatingto.id,
          messagetype: "file",
          filepath: response.id,
          filename: file.name,
          sender: JSON.parse(localStorage.getItem("user")).id,
          message: file.name,
        };

        setMessages((prev) => [
          ...prev,
          {
            chatId: chatingto.id,
            messagetype: "file",
            filepath: response.id,
            filename: file.name,
            sender: JSON.parse(localStorage.getItem("user")).id,
            message: file.name,
          },
        ]);

        const message = await sendMessage(data);

        socket.emit("sendMessage", { ...data, receiverId: chatingto.id });
      } else if (groupActive) {
        const data = {
          groupId: groupActive.id,
          messagetype: "file",
          filepath: response.id,
          filename: file.name,
          sender: JSON.parse(localStorage.getItem("user")).id,
          message: file.name,
          room: groupActive.id,
        };

        socket.emit("sendGroupMessage", data);

        const message = await sendGroupMessage(data);
      }

      return;
    };
    uploading();
  }, [file]);
  return (
    <>
      <div className="h-screen">
        <h1 className="text-center text-3xl  font-bold">Chats</h1>

        <div className="grid grid-cols-5 h-full gap-5 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <div className="col-span-1 bg-blue-500 relative text-white py-4 px-2 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 ">Chats</h2>
            <CreateGroup />
            <div className="w-full overflow-y-auto ">
              {data.map((chat) => {
                return (
                  <Chatlist
                    key={chat.id}
                    chats={chat}
                    setChatingto={setChatingto}
                    setTalkingTo={setTalkingTo}
                    onlineUsers={onlineUsers}
                  />
                );
              })}
              {groupChat.map((chat) => {
                return (
                  <Grouplist
                    key={chat.id}
                    chats={chat}
                    setGroupActive={setGroupActive}
                    setTalkingTo={setTalkingTo}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-span-4 relative bg-white rounded-lg overflow-y-auto">
            <div className=" h-[90%] flex flex-col">
              <div className="bg-gray-200 py-3 px-4 border-b border-gray-300 flex justify-between">
                <h1 className="text-lg font-semibold text-gray-800">
                  {chatingto ? (
                    <>{chatingto ? talkinTo[0].name : "Chat Area"}</>
                  ) : (
                    <>
                      {groupActive && (
                        <>
                          <span className="">{groupActive.name}</span>
                          <>
                            <div className="flex text-xs gap-1">
                              <p>Members:</p>
                              {allGroupMember.map((member) => {
                                return <p>{member.name},</p>;
                              })}
                            </div>
                          </>
                        </>
                      )}
                    </>
                  )}
                </h1>

                {messages?.length !== 0 && (
                  // floating file upload button

                  <div
                    className=" border-2 border-gray-300 rounded-lg px-3 py-1 cursor-pointer flex gap-2 items-center"
                    onClick={() => handleFileUpload()}
                  >
                    <p>Attackment</p>
                    <input
                      type="file"
                      ref={uploadClick}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-2">
                {messages?.length === 0 && (
                  <h1 className="text-center text-2xl font-semibold">
                    Select a chat to start conversation
                  </h1>
                )}

                {loading ? (
                  <h1 className="text-center text-2xl font-semibold">
                    Loading...
                  </h1>
                ) : (
                  <>
                    {" "}
                    {messages?.length !== 0
                      ? messages?.map((message) => {
                          return (
                            <Message
                              key={message.id}
                              message={message}
                              currentUser={JSON.parse(
                                localStorage.getItem("user")
                              )}
                              ref={chatScroll}
                            />
                          );
                        })
                      : null}
                  </>
                )}
              </div>
              {messages !== null && (
                <div className="bg-gray-200 right-0 absolute left-0 bottom-0 py-3 px-4 border-t border-gray-300">
                  <InputEmoji
                    value={""}
                    onChange={(text) => setMessagetoSent(text)}
                    cleanOnEnter
                    onEnter={sendingMessage}
                    placeholder="Type a message"
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
