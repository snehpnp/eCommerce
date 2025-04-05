import React, { useState } from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    quantity: 1,
    image: "https://via.placeholder.com/80x80?text=Product+1",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    quantity: 1,
    image: "https://via.placeholder.com/80x80?text=Product+2",
  },
];

function CartPage() {
  const [cartItems, setCartItems] = useState(dummyProducts);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty 😢</p>
          <button className="btn btn-danger">Go Shopping</button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.name} width="60" height="60" />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price.toLocaleString()}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="text-end mt-4">
            <h5>Total: ₹{total.toLocaleString()}</h5>
            <button className="btn btn-success mt-2">Buy Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
