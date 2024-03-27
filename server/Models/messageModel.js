const mongoose  = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },

    messagetype: {
        type: String,
        required: true,
        enum: ['text', 'file']
    },
    message: {
        type: String,
        
    },
    sender: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        
    },
    filepath: {
        type: String,
        
    }



    
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

messageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = Message;
