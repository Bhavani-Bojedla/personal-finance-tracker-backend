const user=require("../Model/userSchema");

const createUser=async(req,res)=>{
    console.log(req);
    const newuser=new user(req.body);
    try{
        await newuser.save();
        res.status(200).json({
            message:"user created successfully",
        });
    }
    catch(e){console.log(e)
        res.status(500).json({message:e.message})
    }
}
const getUsers=async(req,res)=>{
    const users=await user.find();
    try{

    }
    catch(e){
        console.log(e)
    }
}
module.exports={createUser,getUsers};