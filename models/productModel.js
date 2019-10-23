const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
    maxlength: [40, "A Brand name must have less or equal to 40 characters"],
    minlength: [2, "A Brand name must have more or equal to 2 characters"]
  },
  productName: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
    maxlength: [40, "A product name must have less or equal to 40 characters"],
    minlength: [10, "A tour name must have more or equal to 10 characters"]
  },
  slug: String,
  originalPrice: {
    type: Number,
    required: [true, "A product must have original price"]
  },
  price: {
    type: Number,
    validate: {
      validator: function(val) {
        return val <= this.originalPrice;
      },
      message: "price ({value}) should be below than the original price"
    }
  },
  percentOff: {
    type: Number
  },
  Image: {
    type: String
    // required: [true, "A product must have a image of product"]
  },
  onSale: {
    type: Boolean
  },
  productRating: {
    type: Number,
    default: 0
  },
  discription: {
    type: String
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
