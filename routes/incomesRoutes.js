const express=require("express");

const incomesController=require("../controllers/incomesController");

const incomesrouter=express.Router();
incomesrouter.post("/createincome",incomesController.createIncome);
incomesrouter.get("/getincomes",incomesController.getIncomes);
incomesrouter.delete("/deleteincome/:id",incomesController.deleteIncome)
module.exports=incomesrouter;