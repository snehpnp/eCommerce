// routes/productRoutes.js

const express = require("express");
const Product = require("../Models/product");
const router = express.Router();

// Create a new product
router.post("/products", async (req, res) => {
  const {
    brand,
    productCode,
    name,
    description,
    descriptionAll,
    price,
    offer,
    mainImage,
    allImages,
    createdBy,
    warranty,
    size,
    quantity,
    fabricQuality,
    category,
    color,
  } = req.body;

  try {
    const newProduct = new Product({
      brand,
      productCode,
      name,
      description,
      descriptionAll,
      price,
      offer,
      mainImage,
      allImages,
      createdBy,
      warranty,
      size,
      quantity,
      fabricQuality,
      category,
      color,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "Error fetching products", error: err });
  }
});

// Get a single product by ID
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Error fetching product", error: err });
  }
});

// Update a product
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err });
  }
});

// Delete a product
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting product", error: err });
  }
});

module.exports = router;
