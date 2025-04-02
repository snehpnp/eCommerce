"use strict";

const Product = require("../models/product");

class ProductController {
  // Create a new product
   async createProduct(req, res) {
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
      let existingProduct = await Product.findOne({ productCode });

      if (existingProduct) {
        return res.status(400).json({ message: "Product code already exists" });
      }

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
      console.error(err);
      res.status(400).json({ message: "Error creating product", error: err });
    }
  }

  // Create multiple products
   async createMultipleProducts(req, res) {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }

    try {
      // Check if productCode already exists
      const existingProducts = await Product.find({ productCode: { $in: data.map(p => p.productCode) } });
      const existingCodes = existingProducts.map(p => p.productCode);
      const duplicateCodes = data.filter(p => existingCodes.includes(p.productCode));

      if (duplicateCodes.length > 0) {
        return res.status(400).json({ message: "Product codes already exist", duplicateCodes: duplicateCodes.map(p => p.productCode) });
      }

      const newProducts = await Product.insertMany(data);
      res.status(201).json({ message: "Products created successfully", products: newProducts });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating products", error: err });
    }
  }

  // Get all products
   async getAllProducts(req, res) {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ message: "Error fetching products", error: err });
    }
  }

  // Get a single product by ID
   async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ message: "Error fetching product", error: err });
    }
  }

  // Update a product
   async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
      res.status(400).json({ message: "Error updating product", error: err });
    }
  }

  // Delete a product
   async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: "Error deleting product", error: err });
    }
  }
}


module.exports = new ProductController();

