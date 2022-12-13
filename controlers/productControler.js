//@Date: 01/10/2022
//@Author: Shipon islam
const fs = require("fs");
const productModel = require("../models/productModel");
const { unlinkImage } = require("../utilites/UnlinkFile");

//@Desc: Adding New Product         @Route: product/add
//@Access: Private                  @Method: POST
const addProduct = async (req, res, next) => {
  try {
    if (
      req.files &&
      req.files.length > 0 &&
      req.files.length === 3 &&
      req.body
    ) {
      let product = await productModel.create({
        ...req.body,
        image: req.files.map(
          (ele) =>
            `${req.protocol}://${req.get("host")}/images/product/${
              ele.filename
            }`
        ),
      });

      res.status(201).send(product);
    } else {
      res.json({
        message: "three image required and all other info also required",
      });
    }
  } catch (error) {
    next(error);
  }
};

//@Desc: Update Existing Product   @Route: product/update
//@Access: Private                  @Method: PUT
const productUpdate = async (req, res, next) => {
  const id = req.params.id;
  // const user = req.user.id;

  let productObj;

  try {
    //checking file pass middleware
    if (req.files && req.files.length === 3 && req.body) {
      productObj = {
        ...req.body,
        image: req.files.map(
          (ele) =>
            `${req.protocol}://${req.get("host")}/images/product/${
              ele.filename
            }`
        ),
      };
    } else {
      productObj = {
        ...req.body,
      };
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, productObj);
    // delete existing photo from folder
    if (req.files && req.files.length === 3 && req.body && updatedProduct) {
      unlinkImage(updatedProduct.image, "public/images/product");
    }

    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
};

//@Desc: Delete Existing Product   @Route: product/delete
//@Access: private                 @Method: DELETE
const productDelete = async (req, res, next) => {
  try {
    const deleteProduct = await productModel.findByIdAndDelete(req.params.id);

    deleteProduct && unlinkImage(deleteProduct.image, "public/images/product");
    res.send(deleteProduct);
    // success code here
  } catch (err) {
    // error handling here
    console.error(err);
  }
};

//@Desc: Get All Product         @Route: product/get/all
//@Access: Public                 @Method: GET
const getAllProduct = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  productDelete,
  productUpdate,
  getAllProduct,
};
