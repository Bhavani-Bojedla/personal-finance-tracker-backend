const mongoose=require("mongoose");

const incomeschema=mongoose.Schema(
    {
        incomeText: {
            type: String,
            required: true,
            trim: true,
          },
          incomeCost: {
            type: Number,
            required: true, 
            trim: true,
          },
          incomeDate: {
            type: Date,
            required: true,
            trim: true,
          },
    },
    {
        Collection:"incomes"
    }
)
module.exports=mongoose.model("incomes",incomeschema)