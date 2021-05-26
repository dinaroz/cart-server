const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please include the product price"],
  },
  description: {
    type: String,
    required: true,
  },
 image: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;