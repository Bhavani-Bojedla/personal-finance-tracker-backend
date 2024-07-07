const expenditure = require("../Model/expenditureSchema");

const createExpenditure = async (req, res) => {
  console.log(req);
  const newexpenditure = new expenditure(req.body);
  try {
    await newexpenditure.save();
    res.status(200).json({
      message: "income created successfully",
    });
    }  
    catch (e) {
    res.status(500).json({ message: e.message });
    }
};
const getExpenditure=async(req,res)=>{
    const expenditure=await expenditure.find();
    try{
        res.status(200).json(expenditure);
      }
      catch(e){
        console.log(e);
      }
}
module.exports={createExpenditure,getExpenditure}