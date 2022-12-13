//@Date: 01/10/2022
//@Author: Shipon islam
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};
module.exports = { generateToken };
