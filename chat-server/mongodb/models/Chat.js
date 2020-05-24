const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    logo: String,
    Participants: [{ id: String, name: String }],
    Messages:[
        {
            sender_id: String,
            message: String,
            message_id: Number,
            date: { type: Date, default: Date.now },
        }
    ],
    last_message_id:{type:Number, default: 10001}
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat 