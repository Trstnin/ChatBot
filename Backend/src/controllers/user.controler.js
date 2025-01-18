const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const Users = await userModel.find();
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
    const Existeduser = await userModel.findOne({ email });
    if (Existeduser)
      return res.status(400).json({ message: "user already exists" });
   const hashedPassword = await bcrypt.hash(password , 10);
   const user = await userModel.create({
    name, 
    password: hashedPassword,
    email

   })

    res.status(201).json({ message: "User registered succesfully", id:user._id });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

const loginUsers = async (req, res) => {
     const{email , password} = req.body
     const Existeduser =await userModel.findOne({email});
     if(!Existeduser) return res.status(400).json({message: "something went wrong"});

     bcrypt.compare(password , Existeduser.password, (err, result) => {
      if(result){
        return res.status(200).json({message: "Logged In Sucessfully"})
      }else{
        return res.status(400).json({message: "something went wrong"})
      }
     })
}



module.exports = { getAllUsers, registerUsers, loginUsers }; //exporting a function
