const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("./Connection/conn");
const userRoutes = require("./routes/userRoutes");
const incomesRoutes = require("./routes/incomesRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");

app.use(express.json());
app.use(cors({
  origin:"*"
}));
app.use("/expenditure", expenditureRoutes);
app.use("/income", incomesRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello cors");
});
app.listen(4000, () => {
  console.log(`Server is Listening on 4000`);
});