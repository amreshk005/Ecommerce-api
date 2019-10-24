const express = require("express");
const productController = require("../controllers/productContoller");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, productController.getAllProducts)
  .post(productController.addProduct);

module.exports = router;
