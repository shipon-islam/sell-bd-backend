//@Date: 01/10/2022
//@Author: Shipon islam

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
