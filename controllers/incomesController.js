const incomes=require("../Model/incomesSchema");

const createIncome=async(req,res)=>{
    console.log(req);
    const newincome=new incomes(req.body);
    try{
    await newincome.save();
    res.status(200).json({ 
        message:"income created successfully",
    });
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}
const getIncomes= async(req,res)=>{
    const incomes=await incomes.find();
    try{
      res.status(200).json(incomes);
    }
    catch(e){
      console.log(e);
    }
  }
module.exports={createIncome,getIncomes}