const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute");
const chatRouter = require("./Routes/chatRoute");
const messageRouter = require("./Routes/messageRoute");
const fileRouter = require("./Routes/fileRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/file", fileRouter);

const uri = process.env.URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected")
  })
  .catch((error) => {
    console.log(error)
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {});
