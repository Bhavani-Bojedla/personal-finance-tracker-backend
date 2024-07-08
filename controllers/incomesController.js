
const income=require("../Model/incomeSchema");

const createIncome=async(req,res)=>{
    const newincome=new income(req.body);
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
    const incomes=await income.find();
    try{
      res.status(200).json(incomes);
    }
    catch(e){
      console.log(e);
    }
  }
  const deleteIncome = async (req, res) => {
    const id = req.params.id;
    try {
      const deletedIncome = await income.findByIdAndDelete(id);
      res.status(200).json(deletedIncome);
    } catch (err) {
      console.log(err);
    }
  };
module.exports={createIncome,getIncomes,deleteIncome}