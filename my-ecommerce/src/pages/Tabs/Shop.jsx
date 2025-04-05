import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import * as Config from "../../utils/Config";

function Shop({ name }) {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  const GetProducts = async () => {
    try {
      const response = await axios.get(`${Config.react_domain}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container-fluid" style={{ marginTop: "40px", marginBottom: "50px" }}>
      <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
        <strong>{name}</strong>
      </h4>

      {/* Scroll Arrows */}
      <div style={{ position: "relative" }}>
        <FaChevronLeft
          onClick={scrollLeft}
          style={{
            position: "absolute",
            top: "40%",
            left: 0,
            zIndex: 1,
            fontSize: "25px",
            cursor: "pointer",
            color: "#333",
            background: "#fff",
            padding: "10px",
            borderRadius: "50%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />
        <FaChevronRight
          onClick={scrollRight}
          style={{
            position: "absolute",
            top: "40%",
            right: 0,
            zIndex: 1,
            fontSize: "25px",
            cursor: "pointer",
            color: "#333",
            background: "#fff",
            padding: "10px",
            borderRadius: "50%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        {/* Product Scroll Area */}
        <div
  ref={scrollRef}
  style={{
    display: "flex",
    overflowX: "scroll", // <-- changed here
    gap: "20px",
    padding: "20px 40px",
    scrollBehavior: "smooth",
  }}
  className="custom-scroll"
>

          {products.map((product) => (
            <div
              key={product.id}
              style={{
                flex: "0 0 250px",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={product.mainImage}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>
                {product.name}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FaHeart style={{ color: "red", cursor: "pointer" }} />
                <div>
                  <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>
                    ${product.price.toFixed(2) - 100}
                  </span>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontWeight: "bold",
                }}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

  
    </div>
  );
}

export default Shop;
