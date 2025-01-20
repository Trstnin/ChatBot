const jwt = require('jsonwebtoken');
const  COOKIE_NAME = require('./constants')

const tokenGenerator = (id, email, expireIn) => {
   const payload = {id , email}
   const token = jwt.sign(payload, process.env.JWT_SECRET ) ;
   return token;
}

const verifyUser = (req,res) => {
   const token = req.signedCookies[`${COOKIE_NAME}`]
   console.log(token)
}

module.exports = {tokenGenerator, verifyUser}