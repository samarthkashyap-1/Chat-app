const express = require("express");
const userRouter = express.Router();
const {
  getallUsers,
  createNewUser,
    loginUser,
    findUser
} = require("../Controllers/userControllers");

userRouter.get("/alluser", getallUsers);
userRouter.post("/register", createNewUser);
userRouter.post("/login", loginUser);
userRouter.get("/user/:id", findUser);

module.exports = userRouter;
