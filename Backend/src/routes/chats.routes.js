const express = require('express');
const { verifyToken } = require('../utils/tokensmanager.util');
const {generateChatCompletion,clearChats } = require('../controllers/chats.controler');
const { validate, chatValidator } = require('../utils/validator.util');

const chatRoutes = express.Router()
chatRoutes.post('/new',validate(chatValidator),verifyToken,generateChatCompletion)
chatRoutes.get('/clear',verifyToken,clearChats)

module.exports = chatRoutes