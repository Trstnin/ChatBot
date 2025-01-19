const jwt = require('jsonwebtoken');

const tokenGenerator = (id, email, expireIn) => {
   const payload = {id , email}
   const token = jwt.sign(payload, process.env.JWT_SECRET ) ;
   return token;
}

module.exports = tokenGenerator