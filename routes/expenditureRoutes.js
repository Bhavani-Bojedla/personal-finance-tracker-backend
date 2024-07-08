const express=require('express');
const expenditureController=require("../controllers/expenditureController");
const expenditurerouter=express.Router();

expenditurerouter.post("/createexpenditure",expenditureController.createExpenditure);
expenditurerouter.get("/getexpenditure",expenditureController.getExpenditure);
expenditurerouter.delete("/deleteexpenditure/:id",expenditureController.deleteExpenditure)
module.exports=expenditurerouter;