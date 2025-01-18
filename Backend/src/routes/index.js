const express = require('express');
const userRoutes = require('./user.routes');
const chatRoutes = require('./chats.routes');

const appRouter = express.Router()

appRouter.use('/user', userRoutes) //domain/api/v1/user
appRouter.use('/chats', chatRoutes) //domain/api/v1/chats

module.exports = appRouter