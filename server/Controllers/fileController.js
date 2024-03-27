const File = require("../Models/fileModel");

const createFile = async (req, res) => {
  const path = req.file.path;
  const name = req.file.originalname;

  try {
    const newFile = new File({
      name,
      path,
      contentType: req.file.mimetype,
    });
    const savedFile = await newFile.save();

    res.json(savedFile);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFiles = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const files = await File.findById(chatId);

    const contentType = files.contentType;

    res.set("Content-Type", contentType);
    res.download(files.path, files.name);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getGroupFiles = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const files = await File.find({ groupId });
    res.json(files);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createFile, getFiles, getGroupFiles };
