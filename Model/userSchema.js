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
  },
  {
    Collection: "users",
  }
);
module.exports = mongoose.model("users", userSchema);
