const login=require("../Model/LoginSchema");
const { getUser } = require("./userController");


const createLogin=async(req,res)=>{
    const newlogin=new login(req.body);
    try{
       await newlogin.save();
       res.status(200).json({
         message:"login successfull"+ getUser.body,
       })
    }
    catch(e){
     res.status(500).json({message: e.message});
    }
}

module.exports={createLogin}