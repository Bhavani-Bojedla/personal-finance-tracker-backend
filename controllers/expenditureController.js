const Expenditure = require("../Model/expenditureSchema");
const User=require("../Model/userSchema");
const createExpenditure = async (req, res) => {
 
  try {
    const {ExpenditureText,ExpenditureDate,ExpenditureCost,ExpenditureCategory,Email}= req.body;
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      const expenditure = new Expenditure({ExpenditureText,ExpenditureDate,ExpenditureCost,ExpenditureCategory, users: existingUser });
      await expenditure.save().then(() => res.status(200).json({ expenditure }));
      existingUser.expenditure.push(expenditure);
      existingUser.save();
    }
    }  
    catch (e) {
    res.status(500).json({ message: e.message });
    }
};
const getExpenditure=async(req,res)=>{
  const expenditure= await Expenditure.find({users:req.params.id}).sort({createdAt : -1});
  if(expenditure.length!==0){
   res.status(200).json({expenditure:expenditure});
  }
  else{ 
   res.status(200).json({msg:"no tasks"});
  }
}

const deleteExpenditure = async (req, res) => {
  try {
    const { Email } = req.body;
    const existingUser = await User.findOneAndUpdate(
      { Email },
      { $pull: { expenditure: req.params.id } }
    );
    if (existingUser) {
      await Expenditure.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({
          msg: "deleeted succesfully",
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports={createExpenditure,getExpenditure,deleteExpenditure}