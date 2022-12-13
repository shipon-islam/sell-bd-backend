//@Date: 03/12/2022
//@Author: Shipon islam
const paymentModel = require("../models/paymentModel");
const orderListSet = require("../utilites/orderIdSet");

//@Desc:customer payment info   @Route: customer/payment
//@Access: Private                  @Method: POST

const createPayment = async (req, res, next) => {
  if (req.body && req.body.data) {
    try {
      let paymentInfo = await paymentModel.find();
      const paymentList =
        paymentInfo.length < 0 ? 0 : Number(paymentInfo.length);

      const obj = {
        ...req.body,
        ...req.body.data,
        user: req.user._id,
        orderId: orderListSet(paymentList + 1),
        customerName: `${req.body.data.firstname} ${req.body.data.lastname}`,
      };

      const payment = await paymentModel.create(obj);

      res.send(payment);
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(201).json({ message: "empty all requirement" });
  }
};
//@Desc:update order status        @Route: /customer/order/update/:id
//@Access: Private                  @Method: PUT

const paymentStatus = async (req, res, next) => {
  if (req.body) {
    try {
      let orderInfo = await paymentModel.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.body.status }
      );

      res.send(orderInfo);
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(201).json({ message: "empty all requirement" });
  }
};

//@Desc:get customer orderlist        @Route: customer/payment
//@Access: Private                    @Method: GET
const getPayment = async (req, res, next) => {
  try {
    const payments = await paymentModel.find({ user: req.user._id });
    res.send(payments);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};
//@Desc:get customer order get all     @Route: customer/payment/get/all
//@Access: Private                    @Method: GET
const getPaymentAll = async (req, res, next) => {
  try {
    const payments = await paymentModel.find();
    res.send(payments);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

//@Desc:get customer orderlist one     @Route: customer/payment/:id
//@Access: Private                    @Method: GET
const getPaymentById = async (req, res, next) => {
  try {
    const payments = await paymentModel
      .findOne({ _id: req.params.id })
      .populate("productList");
    res.send(payments);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

module.exports = {
  createPayment,
  getPayment,
  getPaymentById,
  getPaymentAll,
  paymentStatus,
};
