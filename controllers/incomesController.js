const Income=require("../Model/incomeSchema");
const User=require("../Model/userSchema");

const createIncome=async(req,res)=>{
    try{
      const {IncomeText,IncomeCost,IncomeDate,Email}=req.body;
      const existingUser = await User.findOne({ Email });
      if (existingUser) {
        const income = new Income({ IncomeText,IncomeCost,IncomeDate,users: existingUser });
        await income.save().then(() => res.status(200).json({ income }));
        existingUser.income.push(income);
        existingUser.save();
      }
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}
const getIncomes= async(req,res)=>{
  const income= await Income.find({users:req.params.id}).sort({createdAt : -1});
  if(income.length!==0){
   res.status(200).json({income:income});
  }
  else{ 
   res.status(200).json({msg:"no tasks"});
  }
}

const deleteIncome = async (req, res) => {
  try {
    const { Email } = req.body;
    const existingUser = await User.findOneAndUpdate(
      { Email },
      { $pull: { income: req.params.id } }
    );
    if (existingUser) {
      await Income.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({
          msg: "deleeted succesfully",
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports={createIncome,getIncomes,deleteIncome}