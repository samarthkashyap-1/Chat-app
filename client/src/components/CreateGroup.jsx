import React, { useState, useEffect } from "react";
import add from "../assets/add.png";
import { getAlluser } from "../Apis/api";
import { createGroupChat } from "../Apis/api";

const CreateGroup = () => {
    const user = JSON.parse(localStorage.getItem("user"))
  const [createGroup, setCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  
  const [members, setMembers] = useState([user]);

  const [allUser, setAllUser] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllUser = async () => {
      const user = await getAlluser();
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const filteredUser = user.filter((val) => val.id !== currentUser?.id);
      setAllUser(filteredUser);
    };
    fetchAllUser();
  }, []);



  const addingMembers = (member) => {
    setMembers([...members, member]);
    setSearch("");
  };

  const creatingGroup = async () => {
    const data = {
      name: groupName,
      members: members.map((val) => val.id),
    };

    const chat = await createGroupChat(data);



    window.location.reload();

  };

  return (
    <>
      <div
        onClick={() => {
          setCreateGroup(!createGroup);
        }}
        className="size-10 absolute top-2 right-2 cursor-pointer"
      >
        <img src={add} alt="" />
      </div>

      {createGroup && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Create Group</h1>
          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Group Name"
              className="border-2 border-gray-300 text-black  rounded-lg p-2"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Search Members"
              value={search}
              className="border-2 border-gray-300 text-black  rounded-lg p-2"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {search && (
              <div className="absolute bg-white w-60 h-fit overflow-y-auto rounded-lg shadow-lg">
                {allUser
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.username.toLowerCase().includes(search.toLowerCase())
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
                        onClick={() => addingMembers(val)}
                        className="w-full  h-14 border-b-2 flex flex-col p-2  cursor-pointer text-black hover:bg-gray-200"
                      >
                        <h1 className="font-semibold">{val.name}</h1>
                        <h1 className="text-sm">{val.username}</h1>
                      </div>
                    );
                  })}
              </div>
            )}

            {members.map((member, index) => {

                if (member.id === user.id) return

              return (
                <div className="flex gap-2 text-white">
                  <p>Name: </p>
                  <h1 className="text-white">{member.name}</h1>
                </div>
              );
            })}
            <button
              onClick={(e) => {
                e.preventDefault();
                creatingGroup();
              }}
              className="bg-blue-500 text-white rounded-lg p-2"
            >
              Create
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateGroup;
