const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    role: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('chats', chatSchema )