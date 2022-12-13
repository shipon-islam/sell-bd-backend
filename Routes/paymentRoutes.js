//@Date: 03/12/2022
//@Author: Shipon islam

const router = require("express").Router();
const {
  createPayment,
  getPayment,
  getPaymentById,
  paymentStatus,
  getPaymentAll,
} = require("../controlers/paymentControler");
const { protect } = require("../middleware/authMiddleware");

//@Desc:create customer payment     @Route: customer/payment
//@Access: Private                  @Method: POST

router.post("/payment/create", protect, createPayment);
//@Desc:create customer payment     @Route: customer/payment
//@Access: Private                  @Method: POST

router.put("/order/update/:id", protect, paymentStatus);
//@Desc:get customer orderlist all     @Route: customer/payment/get/All
//@Access: Private                      @Method: GET
router.get("/payment/get/all", protect, getPaymentAll);
//@Desc:get customer orderlist      @Route: customer/payment
//@Access: Private                  @Method: GET
router.get("/payment/get", protect, getPayment);
//@Desc:get customer orderlist one     @Route: customer/payment/:id
//@Access: Private                    @Method: GET
router.get("/payment/get/:id", protect, getPaymentById);

module.exports = router;
