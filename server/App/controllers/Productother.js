"use strict";

const { stat } = require("fs");
const path = require("path");
const Product = require(path.resolve(__dirname, "../models/product"));
const Category = require(path.resolve(__dirname, "../models/Cattegories"));
const Cart = require(path.resolve(__dirname, "../models/Cart"));
const Favorite = require(path.resolve(__dirname, "../models/Favorite"));
const User = require(path.resolve(__dirname, "../models/User"));

const { ObjectId } = require("mongoose").Types;

class ProductOtherController {
  async AddtoCart(req, res) {
    const { userId, productId } = req.body;

    try {
      console.log(userId, productId);

      const UserD = await User.findById(userId);
      if (!UserD) {
        return res.json({ msg: "User not found", status: false, data: [] });
      }

      const ProductD = await Product.findById(productId);
      if (!ProductD) {
        return res.json({ msg: "Product not found", status: false, data: [] });
      }

      let cart = await Cart.findOne({ userId });

      if (cart) {
        const productIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
          // ✅ Product already in cart - increase quantity
          cart.products[productIndex].quantity += 1;
        } else {
          // ✅ Product not in cart - push new
          cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();
      } else {
        // ✅ Create new cart with product
        cart = new Cart({
          userId,
          products: [{ productId, quantity: 1 }],
        });
        await cart.save();
      }

      res.json({
        msg: "Product added to cart successfully",
        status: true,
        data: cart,
      });
    } catch (error) {
      console.error(error);
      res.json({
        msg: "Error adding product to cart",
        data: error,
        status: false,
      });
    }
  }

  async getCart(req, res) {
    const { userId } = req.query;
    try {
      const cart = await Cart.findOne({ userId }).populate(
        "products.productId"
      );
      if (!cart) {
        return res.json({ msg: "Cart not found", status: false, data: [] });
      }

      res.json({status: true, msg: "Cart fetched successfully", data: cart });
    } catch (error) {
      console.error(error);
      res.json({ msg: "Error fetching cart", data: error, status: false });
    }
  }

  async deleteCartItem(req, res) {
    try {
      const { userId, productId } = req.body;
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.json({ msg: "Cart not found", status: false, data: [] });
      }

      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // ✅ Product found in cart - remove it
        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.json({
          msg: "Product removed from cart successfully",
          status: true,
          data: cart,
        });
      } else {
        return res.json({
          msg: "Product not found in cart",
          status: false,
          data: [],
        });
      }
    } catch (error) {
      console.error(error);
      res.json({ msg: "Error deleting cart", data: error, status: false });
    }
  }

  async UpdateCartQuantity(req, res) {
    try { 
      const { userId, productId, quantity } = req.body;

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.json({ msg: "Cart not found", status: false, data: [] });
      }

      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (productIndex > -1) {
        // ✅ Product found in cart - update quantity
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return res.json({
          msg: "Cart quantity updated successfully",
          status: true,
          data: cart,
        });
      }
      return res.json({ msg: "Product not found in cart", status: false, data: [] });


    } catch (error) {
      console.error(error);
      res.json({ msg: "Error updating cart quantity", data: error, status: false });
    }
  }




  async addFavorite(req, res) {
    try {
      const { userId, productId } = req.body;
      const UserD = await User.findById(userId);
  
      if (!UserD) {
        return res.json({ msg: "User not found", status: false, data: [] });
      }
  
      let fav = await Favorite.findOne({ userId });
  
      if (fav) {
        const index = fav.products.findIndex(
          (id) => id.toString() === productId
        );
  
        if (index > -1) {
          // ✅ Already in favorites, remove it
          fav.products.splice(index, 1);
        } else {
          // ✅ Not in favorites, add it
          fav.products.push(productId);
        }
  
        await fav.save();
        return res.json({
          msg: "Favorites updated successfully",
          status: true,
          data: fav,
        });
  
      } else {
        // ✅ First time favorite
        const newFav = new Favorite({
          userId,
          products: [productId],
        });
        await newFav.save();
  
        return res.json({
          msg: "Product added to favorites",
          status: true,
          data: newFav,
        });
      }
  
    } catch (error) {
      console.error(error);
      res.json({ msg: "Error adding favorite", data: error, status: false });
    }
  }

  async getFavorite(req, res) {
    const { userId } = req.query;
    try {
      const fav = await Favorite.findOne({ userId }).populate("products");
      if (!fav) {
        return res.json({ msg: "Favorites not found", status: false, data: [] });
      }

      res.json(fav);
    } catch (error) {
      console.error(error);
      res.json({ msg: "Error fetching favorites", data: error, status: false });
    }
  }

  async deleteFavorite(req, res) {
    try {
      const { userId, productId } = req.body;
      const fav = await Favorite.findOne({ userId });

      if (!fav) {
        return res.json({ msg: "Favorites not found", status: false, data: [] });
      }

      const productIndex = fav.products.findIndex(
        (item) => item.productId?.toString() === productId
      );

      if (productIndex > -1) {
        // ✅ Product found in favorites - remove it
        fav.products?.splice(productIndex, 1);
        await fav.save();
        return res.json({
          msg: "Product removed from favorites successfully",
          status: true,
          data: fav,
        });
      } else {
        return res.json({
          msg: "Product not found in favorites",
          status: false,
          data: [],
        });
      }
    } catch (error) {
      console.error(error);
      res.json({ msg: "Error deleting favorite", data: error, status: false });
    }
  }


  










}
module.exports = new ProductOtherController();
