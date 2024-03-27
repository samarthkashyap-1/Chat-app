const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
   {
    members: Array
   },{
    timestamps: true,
   }
    );

const Chat = mongoose.model("Chat", chatSchema);

chatSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
     
    },
});




module.exports = Chat;