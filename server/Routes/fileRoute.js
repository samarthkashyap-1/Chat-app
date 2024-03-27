const express = require("express");
const fileRouter = express.Router();

const {
  createFile,
  getFiles,
  getGroupFiles,
} = require("../Controllers/fileController");
const upload = require("../utils/uploadFile");

fileRouter.post("/", upload.single("file"), createFile);

fileRouter.get("/:chatId", getFiles);

fileRouter.get("/group/:groupId", getGroupFiles);

module.exports = fileRouter;