const express=require("express");
const userController=require("../controllers/userController");

const userRouter=express.Router();
userRouter.post("/checkuser",userController.checkUser);
userRouter.post("/createuser",userController.createUser);
userRouter.get("/getusers",userController.getUser);
// userRouter.post("/createlogin",userController.createLogin);

module.exports=userRouter;