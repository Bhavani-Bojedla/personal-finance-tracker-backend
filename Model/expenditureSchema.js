const mongoose=require("mongoose");
const expenditureSchema=mongoose.Schema(
    {
        ExpenditureText: {
            type: String,
            required: true,
            // trim: true,
          },
          ExpenditureCost: {
            type: Number,
            required: true,
            // trim: true,
          },
          ExpenditureDate: {
            type: Date,
            required: true,
            // trim: true,
          },
          ExpenditureCategory: {
            type: String,
            required: true,
            // trim: true,
          },
       
    },{
        Collection:"expenditure"
    }
);
module.exports=mongoose.model("expenditure",expenditureSchema);