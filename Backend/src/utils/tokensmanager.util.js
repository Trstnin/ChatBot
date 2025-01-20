const jwt = require('jsonwebtoken');
const  COOKIE_NAME = require('./constants')

const tokenGenerator = (id, email, expireIn) => {
   const payload = {id , email}
   const token = jwt.sign(payload, process.env.JWT_SECRET ) ;
   return token;
}

const verifyToken = (req , res , next) => {
   const token = req.signedCookies[`${COOKIE_NAME}`]
  
   if(!token || token.trim() === ""){
      res.status(400).json({message:"Trouble getting a token"})
   }

   jwt.verify(token,process.env.JWT_SECRET, (err,result)=> {
      if(err){
         return res.status(400).json({message:"Token Expired"})
      }else{
         console.log('Token Verification Sucessfully ')
         res.locals.jwtData = result
         return next()
      }
     
          
   })
}

module.exports = {tokenGenerator, verifyToken}