const mongoose=require("mongoose");
const expenditureSchema=mongoose.Schema(
    {
        categories:{
            type:String,
            required:true,
        }
       
    },{
        Collection:"expenditure"
    }
);
module.exports=mongoose.model("expenditure",expenditureSchema);