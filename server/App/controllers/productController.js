"use strict";

const { stat } = require('fs');
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
        return res.json({ msg: "Product code already exists",status:false,data:[] });
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
      res.status(201).json({ msg: "Product created successfully", product: newProduct ,status:true});
    } catch (err) {
      console.error(err);
      res.json({ msg: "Error creating product", data: err ,status:false });
    }
  }

  // Create multiple products
   async createMultipleProducts(req, res) {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.json({ msg: "No data provided", status:false ,data:[] });
    }

    try {
      // Check if productCode already exists
      const existingProducts = await Product.find({ productCode: { $in: data.map(p => p.productCode) } });
      const existingCodes = existingProducts.map(p => p.productCode);
      const duplicateCodes = data.filter(p => existingCodes.includes(p.productCode));

      if (duplicateCodes.length > 0) {
        return res.json({ msg: "Product codes already exist", duplicateCodes: duplicateCodes.map(p => p.productCode),status:false ,data:[] });
      }

      const newProducts = await Product.insertMany(data);
      res.status(201).json({ msg: "Products created successfully", products: newProducts,status:true,data:[] });
    } catch (err) {
      console.error(err);
      res.json({ msg: "Error creating products", data: err,status:false });
    }
  }

  // Get all products
   async getAllProducts(req, res) {
    try {
 
      let CategoryId = req.query.category || null;


      let query = {};


      if (CategoryId && CategoryId != "All")  {
          if(CategoryId == "pillow-covers") {
            query.category = { $regex: new RegExp(`^${"Pillow Covers"}$`, 'i') };

          }else if(CategoryId == "mattress-protectors") {
            query.category = { $regex: new RegExp(`^${"Mattress Protectors"}$`, 'i') };

          }else if(CategoryId == "blanket") {
            query.category = { $regex: new RegExp(`^${"Blankets"}$`, 'i') };

          }else if(CategoryId == "duvet-covers") {
            query.category = { $regex: new RegExp(`^${"Comforters & Duvets"}$`, 'i') };

          }
          
          else {

            query.category = { $regex: new RegExp(`^${CategoryId}$`, 'i') };
          }


      }
      

      const products = await Product.find(query).sort({ createdAt: -1 });
      res.json({data:products,msg:"success",status:true});
    } catch (err) {
      res.json({ msg: "Error fetching products", data: err,status:false });
    }
  }

  // Get a single product by ID
   async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      res.json(product);
    } catch (err) {
      res.json({ msg: "Error fetching product", data: err ,status:false });
    }
  }

  // Update a product
   async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ msg: "Product not found" });
      res.json({ msg: "Product updated successfully", product: updatedProduct,status:true });
    } catch (err) {
      res.json({ msg: "Error updating product", data: err ,status});
    }
  }

  // Delete a product
   async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ msg: "Product not found",status:false,data:[] });
      res.json({ msg: "Product deleted successfully",status:true,data:[] });
    } catch (err) {
      res.json({ msg: "Error deleting product", data: err,status:false });
    }
  }

  // Add  Category
    async addCategory(req, res) {
      const { name ,description} = req.body;
      try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ msg: "Category created successfully", category: newCategory,status:true });
      } catch (err) {
        console.error(err);
        res.json({ msg: "Error creating category", data: err,status:false });
      }
    }

    // Edit Category
     async editCategory(req, res) {
      const {id, name,description } = req.body;
      try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCategory) return res.status(404).json({ msg: "Category not found" });
        res.json({ msg: "Category updated successfully", category: updatedCategory ,status:true});
      } catch (err) {
        res.json({ msg: "Error updating category", data: err ,status:false });
      }
    }

    // Delete Category
     async deleteCategory(req, res) {
      try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ msg: "Category not found",status:false,data:[] });
        res.json({ msg: "Category deleted successfully",status:true,data:[] });
      } catch (err) {
        res.json({ msg: "Error deleting category", data: err,status:false });
      }
    }

  // Get all categories
    async getAllCategories(req, res) {
      try {
        console.log("Fetching all categories...");
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
      } catch (err) {
        res.json({ msg: "Error fetching categories", data: err,status:false });
      }
    }

}


module.exports = new ProductController();
