const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema(
  {
 
    groupId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },

    messagetype: {
      type: String,
      required: true,
      enum: ["text", "file"],
    },
    message: {
      type: String,
    },
    sender: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
    },
    filepath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const groupMessage = mongoose.model("groupMessage", groupMessageSchema);

groupMessageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = groupMessage;
