const mongoose=require("mongoose");

const incomeSchema=mongoose.Schema(
    {
        IncomeText:{
            type:String,
            required:true,
        }
        ,IncomeCost:{
            type:Number,
            required:true
        },
        IncomeDate:{
            type:Date,
            required:true
        },
        users:[{
            type:mongoose.Types.ObjectId,
            ref:"users"
        }]
    },{
        timestamps: true,
        collection:"income"
    }
)
module.exports=mongoose.model("income",incomeSchema);