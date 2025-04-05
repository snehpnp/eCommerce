// models/product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionAll: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: String,
  },
  mainImage: {
    type: String,
    // required: true,
  },
  allImages: [{
    type: String,
  }],
  createdBy: {
    type: String, // User who added the product
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  warranty: {
    type: String,
  },
 
  quantity: {
    type: Number,
    required: true,
  },
  fabricQuality: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
size: [String],            // ✅ Array of sizes
  color: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
