// models/Favorite.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
}, { timestamps: true });




const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;