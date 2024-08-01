const User = require("../Model/userSchema");
const bcrypt=require("bcryptjs");
const createUser = async (req, res) => {
  const {Name,Username,Email,Password}= req.body;

  try {
    const emailExists = await User.findOne({ Email });
    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
  
    const usernameExists = await User.findOne({ Username });
    if (usernameExists) {
      return res.status(400).json({ message: "User with this username already exists" });
    }
    const hashpassword=bcrypt.hashSync(Password);
    const user = new User({
      Name,
      Username,
      Email,
      Password: hashpassword,
    });
 
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


const checkUser = async (req, res) => {
  
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ message: "No record existed" });
    } else {
      const isValidPassword = bcrypt.compareSync(Password, user.Password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "The password is incorrect" });
      }
      const {...others}=user._doc; 
      res.status(200).json({others,
        msg:"success" 
      });
    }
  } catch (error) { 
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => { 

  const user = await User.findById(req.params.id);
  if(user){
    res.status(200).json({user:user});
  }
  else{ 
    res.status(200).json({msg:"no user"});
   }
};


module.exports = { createUser, getUser, checkUser};
