import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import Notfound from "./Pages/Notfound";
import { Link } from "react-router-dom";
import { getAlluser, createChat } from "./Apis/api";
import Upload from "./Pages/Upload";
import { Context } from "./Apis/Context";
import ShareButton from "./components/ShareButton";
import Home from "./Pages/Home";
import About from "./Pages/About";

const App = () => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [search, setSearch] = useState("");
  const [newChat, setNewChat] = useState(0);
  const [dataToSend, setDataToSend] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // if (user) {
    //   navigate("/chat");
    // }

    const fetchAllUser = async () => {
      const user = await getAlluser();
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const filteredUser = user.filter((val) => val.id !== currentUser?.id);
      setAllUser(filteredUser);
    };
    fetchAllUser();
  }, [navigate]);

  const creatingChat = async (receiver) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const chat = {
      firstId: user.id,
      secondId: receiver.id,
    };
    const newChat = await createChat(chat);
    //
    setSearch("");
    setNewChat((prev) => prev + 1);
  };
  return (
    <Context.Provider value={{ dataToSend, setDataToSend }}>
      <div className="h-screen flex flex-col">
        <div className="flex h-10 ">
          {user && (
            <h1 className="text-3xl mr-auto font-bold text-center">
              Welcome {user.name}
            </h1>
          )}
          {user && <ShareButton />}

          {user ? (
            <div className="flex  justify-end gap-5">
              {/* create search bar */}
              <div>
                <input
                  className="border-2 mt-1 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  type="text"
                  placeholder="Search"
                />
                {search && (
                  <div className="absolute bg-white w-60 h-fit overflow-y-auto rounded-lg shadow-lg">
                    {allUser
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.username
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        } else if (
                          val.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((val, key) => {
                        return (
                          <div
                            onClick={() => creatingChat(val)}
                            className="w-full  h-14 border-b-2 flex flex-col p-2  cursor-pointer hover:bg-gray-200"
                          >
                            <h1 className="font-semibold">{val.name}</h1>
                            <h1 className="text-sm">{val.username}</h1>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              <Link to="/home" className="text-2xl">
                Home
              </Link>

              <Link to="/about" className="text-2xl">
                About
              </Link>

              <Link to="/chat" className="text-2xl">
                Chats
              </Link>

              <Link
                to="/"
                onClick={() => localStorage.removeItem("user")}
                className="text-2xl"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex justify-end gap-5">
              <Link to="/" className="text-2xl">
                Login
              </Link>
              <Link to="/register" className="text-2xl">
                Register
              </Link>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat newChat={newChat} />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/file" element={<Upload />} />
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;
