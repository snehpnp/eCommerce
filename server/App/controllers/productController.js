"use strict";

const path = require('path');
const Product = require(path.resolve(__dirname, '../models/product'));
const Category = require(path.resolve(__dirname, '../models/Cattegories'));

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
 
      let CategoryId = req.query.category || null;

console.log("CategoryId:", CategoryId);

      let query = {};


      if (CategoryId && CategoryId != "All")  {
          if(CategoryId == "pillow-covers") {
            query.category = { $regex: new RegExp(`^${"Pillow Covers"}$`, 'i') };

          }else {

            query.category = { $regex: new RegExp(`^${CategoryId}$`, 'i') };
          }


      }
      

      const products = await Product.find(query).sort({ createdAt: -1 });
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

  // Add  Category
    async addCategory(req, res) {
      const { name ,description} = req.body;
      try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error creating category", error: err });
      }
    }

    // Edit Category
     async editCategory(req, res) {
      const {id, name,description } = req.body;
      try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
      } catch (err) {
        res.status(400).json({ message: "Error updating category", error: err });
      }
    }

    // Delete Category
     async deleteCategory(req, res) {
      try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted successfully" });
      } catch (err) {
        res.status(400).json({ message: "Error deleting category", error: err });
      }
    }

  // Get all categories
    async getAllCategories(req, res) {
      try {
        console.log("Fetching all categories...");
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
      } catch (err) {
        res.status(400).json({ message: "Error fetching categories", error: err });
      }
    }

}


module.exports = new ProductController();
