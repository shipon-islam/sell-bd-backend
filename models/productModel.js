//@Date: 01/10/2022
//@Author: Shipon islam

const mongoose = require("mongoose");

const productScheema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    features: [{ type: String, required: true }],
    image: [{ type: String, required: true }],
    rating: { type: String },

    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discountprice: {
      type: Number,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const productModel = mongoose.model("Product", productScheema);
module.exports = productModel;
