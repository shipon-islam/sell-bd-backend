//@Date: 01/10/2022
//@Author: Shipon islam

const jwt = require("jsonwebtoken");
const userModel = require("../models/usersModel");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decorded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decorded.id).select("-password");

      next();
    }
    if (!token) {
      res.json({ message: "you don't have any token" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
