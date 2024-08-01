const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Username: {
      type: String,
      unique: true,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    income:[{
      type:mongoose.Types.ObjectId,
      ref:"income"
    }],
    expenditure:[{
      type:mongoose.Types.ObjectId,
      ref:"expenditure"
    }]
  },
  {
    Collection: "users",
  }
);
module.exports = mongoose.model("users", userSchema);
