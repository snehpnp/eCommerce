import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? <p>No items in cart.</p> : <p>{cart.length} items in cart.</p>}
    </div>
  );
};

export default Cart;
