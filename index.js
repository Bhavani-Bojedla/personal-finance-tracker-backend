const express = require('express')
const mongoose=require("mongoose");
const cors=require("cors");
const app = express()
const userRoutes=require("./routes/userRoutes");
const incomesRoutes=require("./routes/incomesRoutes");
const expenditureRoutes=require("./routes/expenditureRoutes");
const dbConnect=async()=>{
    try{
       await mongoose.connect("mongodb://localhost:27017/FinanceTracker",
        //  { useNewUrlParser: true, useUnifiedTopology: true }
       );
       console.log("Database Connected");
    }
    catch(e){
        console.log("error in db connection")
        console.log(e);
    }
}
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
     res.send("hello finance")
});
app.use("/incomes",incomesRoutes);
app.use("/users",userRoutes); 
app.listen(4000, () => {
    dbConnect();
    console.log(`Server is Listening on 4000`)
});