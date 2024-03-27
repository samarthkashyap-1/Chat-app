const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    
   
    sender: {
        type: String,
        // required: true
    },
    groudId: {
        type: String,
       
    },
    chatId: {
        type: String,
        
    },

},
{
    timestamps: true
});


const File= mongoose.model('File', fileSchema);

fileSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = File;

