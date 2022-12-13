//@Date: 01/10/2022
//@Author: Shipon islam

const router = require("express").Router();
//external import
const { protect } = require("../middleware/authMiddleware");
const uploadFile = require("../middleware/uploadFile");
const {
  addProduct,
  productUpdate,
  productDelete,
  getAllProduct,
} = require("../controlers/productControler");

//@Desc: Adding New Product         @Route: product/add
//@Access: Private                  @Method: POST
router.post("/add", protect, uploadFile("/images/product"), addProduct);

//@Desc: Update Existing Product   @Route: product/update/:id
//@Access: Private                  @Method: PUT
router.put(
  "/update/:id",
  protect,
  uploadFile("/images/product"),
  productUpdate
);

//@Desc: Delete Existing Product   @Route: product/delete/:id
//@Access: private                 @Method: DELETE
router.delete("/delete/:id", protect, productDelete);

//@Desc: Get All Product         @Route: product/get/all
//@Access: Public                 @Method: GET
router.get("/get/all", getAllProduct);

module.exports = router;
