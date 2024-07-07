const mongoose=require("mongoose");

const incomeschema=mongoose.Schema(
    {
        incomeText:{
            type:String, 
            required:true,
        },
        incomeCost:{
            type:String,
            required:true,
        },
        incomeDate:{
            type:Date,
            required:true,
        }
    },
    {
        Collection:"incomes"
    }
)
module.exports=mongoose.model("incomes",incomeschema)