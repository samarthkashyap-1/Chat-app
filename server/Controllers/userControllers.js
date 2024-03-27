const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getallUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createNewUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const newUser = new User({
      name,
      username: username.toLowerCase(),
      email,
      password,
    });
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    newUser.password = passwordHash;

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({
      token,
      username: user.username,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

const findUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.find({ _id: id });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

module.exports = { getallUsers, createNewUser, loginUser, findUser };
