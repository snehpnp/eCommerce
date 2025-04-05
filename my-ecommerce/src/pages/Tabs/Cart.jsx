import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import * as Config from "../../utils/Config";
import { jwtDecode } from "jwt-decode";

function CartPage() {
  // Keep cartItems synced with Redux
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  let GetCart = async () => {
    const decoded = jwtDecode(token);

    const response = await axios.get(
      Config.react_domain + "/api/cart?userId=" + decoded.id
    );
    console.log("GetCart", response.data);
    if (response.data.status) {
      setCartItems(response.data.data.products);
    } else {
      toast.error("Failed to fetch cart items");
    }
  };
  useEffect(() => {
    GetCart();
  }, []);

  const handleRemove = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId._id !== productId);
    setCartItems(updatedCart); // Optimistic UI
  
    try {
      const decoded = jwtDecode(token);
      await axios.post(`${Config.react_domain}/api/cart/delete`, {
        userId: decoded.id,
        productId: productId,
      });
      toast.success("Item removed");
    } catch (error) {
      console.error("Remove error", error);
      toast.error("Failed to remove item");
      GetCart(); // Re-fetch in case of error
    }
  };
  
  

  const handleQuantityChange = async (productId, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId._id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart); // Optimistic UI update
  
    try {
      const decoded = jwtDecode(token);
      const updatedItem = updatedCart.find(
        (item) => item.productId._id === productId
      );
  
      await axios.post(`${Config.react_domain}/api/updatecart/qty`, {
        userId: decoded.id,
        productId: productId,
        quantity: updatedItem.quantity,
      });
  
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Quantity update failed", error);
      toast.error("Failed to update quantity");
      GetCart(); // Rollback in case of failure
    }
  };
  

  const total = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );


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
                {cartItems.map((item) => {
                  const productData = item.productId; // Correct way to define inside map
                  return (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={productData.mainImage}
                          alt={productData.name}
                          width="150"
                          height="100"
                        />
                      </td>
                      <td>{productData.name}</td>
                      <td>₹{productData.price.toLocaleString()}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() =>
                              handleQuantityChange(productData._id, -1)
                            }
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() =>
                              handleQuantityChange(productData._id, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ₹{(productData.price * item.quantity).toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemove(productData._id)}
                          
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default CartPage;
