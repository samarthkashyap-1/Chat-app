const Chat = require("../Models/chatModel");
const GroupChat = require("../Models/groupChatModal");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: {
        $all: [firstId, secondId],
      },
    });

    
    if (chat) {
      res.status(200).json(chat) 
      return;
    }
    const newChat = new Chat({
      members: [firstId, secondId],
    });

    const savedChat = await newChat.save();

    res.json(savedChat);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const finduserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await Chat.find({ members: { $in: [userId] } });
    res.json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: {
        $all: [firstId, secondId],
      },
    });

    console.log(chat);

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};




const createGroupChat = async (req, res) => {
  const { members, name } = req.body;

  try {
    // const chat = await GroupChat.findOne({
    //   members: {
    //     $all: members,
    //   },
    // });
    // if (chat) {
    //   res.status(200).json(chat);
    //   return;
    // }

    const newChat = new GroupChat({
      members,
      name,
    });

    const savedChat = await newChat.save();

    res.json(savedChat);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const findGroupChat = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chat = await GroupChat.find({
      members: {
        $in: [userId],
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findGroupChatById = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const chat = await GroupChat.findById(groupId).populate(
      "members",
      "name email"
    );

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createChat,
  finduserChats,
  findChat,
  createGroupChat,
  findGroupChat,
  findGroupChatById,
};
// module.exports = { createChat, finduserChats, findChat, createGroupChat, findGroupChat };
