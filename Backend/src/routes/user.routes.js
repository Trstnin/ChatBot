const express = require('express');
const {getAllUsers , registerUsers , loginUsers, verifyUsers}  = require('../controllers/user.controler');
const { validate ,signupValidator, logInValidator } = require('../utils/validator.util');
const {  verifyToken } = require('../utils/tokensmanager.util');



const userRoutes = express.Router()
userRoutes.get('/', getAllUsers)
userRoutes.post('/signup',validate(signupValidator) ,registerUsers)
userRoutes.post('/login',validate(logInValidator) ,loginUsers)
userRoutes.get('/auth-status',verifyToken,verifyUsers)


module.exports = userRoutes