const express = require('express');
const {getAllUsers , registerUsers , loginUsers}  = require('../controllers/user.controler');
const { validate ,signupValidator, logInValidator } = require('../utils/validator.util');



const userRoutes = express.Router()
userRoutes.get('/', getAllUsers)
userRoutes.post('/signup',validate(signupValidator) ,registerUsers)
userRoutes.post('/login',validate(logInValidator) ,loginUsers)

module.exports = userRoutes