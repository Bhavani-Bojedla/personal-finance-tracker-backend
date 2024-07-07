const user=require("../Model/userSchema");

// const createUser=async(req,res)=>{
    
//     console.log(req);
//     const newuser=new user(req.body);
//     try{
//         await newuser.save();
//         res.status(200).json({ 
//             message:"user created successfully",
//         });
//     }
//     catch(e){console.log(e)
//         res.status(500).json({message:e.message})
//     }
// }

const createUser = async (req, res) => {
    const { Username, Email } = req.body;
    try {
      const existingUser = await user.findOne({ $or: [{ Username: Username }, { Email: Email }] });
      if (existingUser) {
        return res.status(400).json("Account already exists with the provided details.");
      }
      const newuser=new user(req.body);
      await newuser.save();
      res.status(200).json({ message: "User created successfully" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  };
  
// const checkAccount=async(req,res)=>{
//     const {Username,Email} = req.body;
//     user.finOne({$or: [{ Username: Username }, { Email: Email } ]})
//     .then((existingUser) => {
//         if (existingUser) {
//           return res.status(400).json("Account already exists with the provided details.");
//         }
        
  
//     })
// }
const checkUser=async(req,res)=>{
    const {Email,Password}=req.body;
    user.findOne({Email:Email})
    .then(user=>{
        if(user){
            if(user.Password==Password){
                res.json("success")
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("No record exisited")
        }
    })
}
const getUsers=async(req,res)=>{
    const users=await user.find();
    try{
         res.status(200).json(users);
    }
    catch(e){
        console.log(e)
    }
}
module.exports={createUser,getUsers,checkUser};