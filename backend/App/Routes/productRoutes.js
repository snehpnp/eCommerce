const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/product", ProductController.createProduct);
router.post("/products", ProductController.createMultipleProducts);
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
