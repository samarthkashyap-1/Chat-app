const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true,
      validate: [arrayLimit, "{PATH} exceeds the limit of 2"],
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length > 2;
}

const groupChat = mongoose.model("groupChat", groupChatSchema);

groupChatSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = groupChat;
