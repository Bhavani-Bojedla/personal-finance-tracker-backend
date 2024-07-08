// const user = require("../Model/userSchema");

// const createUser = async (req, res) => {
//   const newuser = req.body;

//   try {
//     const emailExists = await user.findOne({ Email: newuser.Email });
//     if (emailExists) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }
  
//     const usernameExists = await user.findOne({ Username: newuser.Username });
//     if (usernameExists) {
//       return res
//         .status(400) 
//         .json({ message: "User with this username already exists" });
//     }
//     const newUser = new user({
//       Name: newuser.Name,
//       Username: newuser.Username,
//       Email: newuser.Email,
//       Password: newuser.Password,
//     });

//     await newUser.save();
//     res.status(200).json({ message: "User created successfully" });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };

// const checkUser = async (req, res) => {
//   const { Email, Password } = req.body;
//   user.findOne({ Email: Email }).then((user) => {
//     if (user) {
//       if (user.Password == Password) { 
//         res.json("success");   
//       } else {
//         res.status(400).json("the password is incorrect");
//       }
//     } else {
//       res.status(400).json("No record exisited");
//     }
//   });
// };
// const getUsers = async (req, res) => {
// //   const users = await user.findOne({ Email: newuser.Email });
//   const users = await user.find();
//   try {
//     res.status(200).json(users);
//   } catch (e) {
//     console.log(e);
//   }
// };
// module.exports = { createUser, getUsers, checkUser };


const jwt = require('jsonwebtoken');
const User = require("../Model/userSchema");

const getUser = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    const user = await User.findById(verified._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;

  try {
    const emailExists = await User.findOne({ Email: newUser.Email });
    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
  
    const usernameExists = await User.findOne({ Username: newUser.Username });
    if (usernameExists) {
      return res.status(400).json({ message: "User with this username already exists" });
    }
    
    const user = new User({
      Name: newUser.Name,
      Username: newUser.Username,
      Email: newUser.Email,
      Password: newUser.Password,
    });

    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const checkUser = async (req, res) => {
  const { Email, Password } = req.body;
  User.findOne({ Email: Email }).then((user) => {
    if (user) {
      if (user.Password == Password) {
        const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
        res.json({ message: "success", token: token });
      } else {
        res.status(400).json("The password is incorrect");
      }
    } else {
      res.status(400).json("No record existed");
    }
  });
};

module.exports = { createUser, getUser, checkUser };
