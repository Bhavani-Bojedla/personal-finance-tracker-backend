const expenditure = require("../Model/expenditureSchema");

const createExpenditure = async (req, res) => {
  const newexpenditure = new expenditure(req.body);
  try {
    await newexpenditure.save();
    res.status(200).json({
      message: "Expenditure created successfully",
    });
    }  
    catch (e) {
    res.status(500).json({ message: e.message });
    }
};
const getExpenditure=async(req,res)=>{
    const expenditures=await expenditure.find();
    try{
        res.status(200).json(expenditures);
      }
      catch(e){
        res.status(500).json({ message: e.message });
      }
}
const deleteExpenditure = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedExpenditure = await expenditure.findByIdAndDelete(id);
    res.status(200).json(deletedExpenditure);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports={createExpenditure,getExpenditure,deleteExpenditure}