const mongoose=require("mongoose");

const loginSchema=mongoose.Schema(
    {
        Email:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        }
    },
    {collection:"login"}
)

module.exports=mongoose.model("login",loginSchema)