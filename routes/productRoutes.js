const express = require("express");
const productController = require("../controllers/productContoller");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct);

module.exports = router;
