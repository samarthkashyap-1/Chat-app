const express = require("express");
const chatRouter = express.Router();
const {
  createChat,
  finduserChats,
  findChat,
  createGroupChat,
  findGroupChat,
  findGroupChatById
} = require("../Controllers/chatControllers");

chatRouter.get("/:userId", finduserChats);

chatRouter.post("/", createChat);

chatRouter.get("/find/:firstId/:secondId", findChat);

chatRouter.post("/group", createGroupChat);

chatRouter.get("/group/:userId", findGroupChat);

chatRouter.get("/group/id/:groupId", findGroupChatById);

module.exports = chatRouter;
