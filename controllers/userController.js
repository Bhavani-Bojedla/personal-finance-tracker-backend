const User = require("../Model/userSchema");


const getUser = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
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


// const getLogin = async (req, res) => {
//   const users = await User.find();
//   try {
//     res.status(200).json(users);
//   } catch (e) {
//     console.log(e);
//   }
// };


const checkUser = async (req, res) => {
  const { Email, Password } = req.body;
  User.findOne({ Email: Email }).then((user) => {
    if (user) {
      if (user.Password == Password) {
        // const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
        res.json({ message: "success" });
      } else {
        res.status(400).json("The password is incorrect");
      }
    } else {
      res.status(400).json("No record existed");
    }
  });
};

module.exports = { createUser, getUser, checkUser};
