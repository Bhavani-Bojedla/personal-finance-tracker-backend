const mongoose=require('mongoose');

const dbconnect=async ()=>{
      try{
        await mongoose.connect("mongodb+srv://admin:Py6CUFdbc2Rs7H1B@cluster0.zbicutx.mongodb.net/Finance")
        
        .then(()=>{
          console.log("connected to db")
        })
      }
      catch(e){
          //  res.status(400).json({
          //   msg:"not connected"
          //  })
          console.log(e)
      }
}

dbconnect();