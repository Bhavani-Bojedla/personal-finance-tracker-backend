const express=require("express");
const userController=require("../controllers/userController");

const userrouter=express.Router();
userrouter.post("/createuser",userController.createUser);
userrouter.get("/getusers",userController.getUsers);

module.exports=userrouter;