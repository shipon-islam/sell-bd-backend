//@Date: 31/09/2022
//@Author: Shipon islam

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((res) => console.log("connected"))
  .catch((err) => console.log(err));
