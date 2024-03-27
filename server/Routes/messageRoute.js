const express = require("express");

const messageRouter = express.Router();

const {
  createMessage,
  getMessages,
  createGroupMessage,
  getGroupMessages,
  sendMessagetoMultipleUsers,
} = require("../Controllers/messageController");

messageRouter.post("/", createMessage);
messageRouter.get("/:chatId", getMessages);
messageRouter.post("/group", createGroupMessage);
messageRouter.get("/group/:groupId", getGroupMessages);
messageRouter.post("/multiple", sendMessagetoMultipleUsers);



module.exports = messageRouter;

