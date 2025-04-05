const express = require("express");
const ProductController = require("../controllers/productController");

const ProductOther = require("../controllers/Productother");

const router = express.Router();

router.post("/product", ProductController.createProduct);
router.post("/products", ProductController.createMultipleProducts);
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

router.post("/categories", ProductController.addCategory);
router.get("/categories", ProductController.getAllCategories);

router.put("/categories/:id", ProductController.editCategory);
router.delete("/categories/:id", ProductController.deleteCategory);

router.post("/addtocart", ProductOther.AddtoCart);
router.get("/cart", ProductOther.getCart);
router.post("/cart/delete", ProductOther.deleteCartItem);


router.post("/addfav", ProductOther.addFavorite);

router.get("/fav", ProductOther.getFavorite);

router.post("/fav/delete", ProductOther.deleteFavorite);
router.post("/updatecart/qty", ProductOther.UpdateCartQuantity);




module.exports = router;
