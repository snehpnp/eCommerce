import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],         // All available products
  likes: [],       // Like status per product ID: { [id]: true/false }
  cart: [],        // Items added to cart
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Set all products
    setProducts: (state, action) => {
      state.all = action.payload;
    },

    // Toggle like status for a product
    toggleLike: (state, action) => {
      const id = action.payload;
      state.likes[id] = !state.likes[id];
    },

    // Add a product to cart if it doesn't exist
    addToCart: (state, action) => {
      const product = action.payload;
      const exists = state.cart.find((item) => item._id === product._id);

      if (!exists) {
        state.cart.push(product);
        console.log("Added to cart:", product.name);
      } else {
        console.log("Product already in cart:", product.name);
      }
    },
  },
});

// Export actions and reducer
export const { setProducts, toggleLike, addToCart } = productsSlice.actions;
export default productsSlice.reducer;
