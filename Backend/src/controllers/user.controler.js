const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {tokenGenerator} = require("../utils/tokensmanager.util");
const COOKIE_NAME = require("../utils/constants");




const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    if (!Users) {
      return res.status(400).json({ message: "no user found" });
    }

    return res.status(200).json({ message: "ok", Users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const Existeduser = await User.findOne({ email });
    if (Existeduser)
      return res.status(400).json({ message: "user already exists" });
   const hashedPassword = await bcrypt.hash(password , 10);
   const user = await User.create({
    name, 
    password: hashedPassword,
    email

   })

   //create user and send cookie
   res.clearCookie(COOKIE_NAME, {
    path:'/',
    domain: 'localhost',
    httpOnly: true,
    signed: true
   })
  

      const token = tokenGenerator(Existeduser.id.toString(), Existeduser.email);
      const expires = new Date();
      expires.setDate(expires.getDate() + 7)
      res.cookie(COOKIE_NAME, token , {
        path:'/',
        domain: 'localhost',
        httpOnly: true,
        expires,
        signed: true
      })

    res.status(201).json({ message: "User registered succesfully",  email:user.email , name: user.name });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

const loginUsers = async (req, res) => {
   try {
      const{email , password} = req.body
      //console.log(email)
      const Existeduser =await User.findOne({email});
      //console.log(Existeduser)
      if(!Existeduser) return res.status(400).json({message: "something went wrong "});
 
      bcrypt.compare(password , Existeduser.password, (err, result) => {
       if(result){
        
        //creating and sending cookie
         res.clearCookie(COOKIE_NAME, {
          path:'/',
          domain: 'localhost',
          httpOnly: true,
          signed: true
         })
        

            const token = tokenGenerator(Existeduser.id.toString(), Existeduser.email);
            const expires = new Date();
            expires.setDate(expires.getDate() + 7)
            res.cookie(COOKIE_NAME, token , {
              path:'/',
              domain: 'localhost',
              httpOnly: true,
              expires,
              signed: true
            })


         return res.status(200).json({message: "Logged In Sucessfully" ,  email:Existeduser.email , name: Existeduser.name})
       }else{
         return res.status(200).json({message: "something went wrong "})
       }

      })
   } catch (error) {
      console.log(error)
       res.status(400).json({message: "Error", cause: error.message})
   }
}

const verifyUsers = async (req, res) => {
  try {
     
     const Existeduser =await User.findById(res.locals.jwtData.id);
     //console.log(Existeduser)
     if(!Existeduser) return res.status(400).send( "User not registered or token malfunctioned");
     if(Existeduser._id.toString() !== res.locals.jwtData.id ){
      return res.status(400).send( "Permissons didint matched");
     }
     
    

     }
   catch (error) {
     console.log(error)
      res.status(400).json({message: "Error", cause: error.message})
  }
}



module.exports = { getAllUsers, registerUsers, loginUsers ,verifyUsers}; //exporting a function
