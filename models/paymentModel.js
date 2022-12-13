//@Date: 03/12/2022
//@Author: Shipon islam
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ],
  orderId: { type: String, required: true },
  date: { type: String, required: true },
  customerName: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "delivered"],
    default: "pending",
  },
});
const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;
