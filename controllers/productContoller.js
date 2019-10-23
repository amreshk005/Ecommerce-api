const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // Execute the Query
  const products = await Product.find();

  //Send Response
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products
    }
  });
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct
    }
  });
});
