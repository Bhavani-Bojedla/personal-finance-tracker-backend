const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const incomesRoutes = require("./routes/incomesRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Bhavani-Bojedla:Bhavani123@cluster1.34vtstj.mongodb.net/FinanceTracker"
      //  { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Database Connected");
  } catch (e) {
    console.log("error in db connection");
    console.log(e);
  }
};
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use("/expenditure", expenditureRoutes);
app.use("/income", incomesRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello finance");
});
app.listen(4000, () => {
  dbConnect();
  console.log(`Server is Listening on 4000`);
});

// "body-parser": "^1.20.2",
// "cors": "^2.8.5",
// "express": "^4.19.2",
// "jsonwebtoken": "^9.0.2",
// "mongoose": "^8.4.5",
// "nodemon": "^3.1.4"
