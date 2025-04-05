import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const BedsheetProductCards = () => {
  const [likes, setLikes] = useState({});
  const [imageIndex, setImageIndex] = useState({});
  const [products, setProducts] = useState([]);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  let Token = localStorage.getItem("token");

  const handleImageScroll = (productId, dir, total) => {
    setImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      const nextIndex =
        dir === "left"
          ? (currentIndex - 1 + total) % total
          : (currentIndex + 1) % total;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const truncateDescription = (text, wordLimit) => {
    const words = text.trim().split(" ");
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(" ") + "...";
  };

  const arrowButtonStyle = (side) => ({
    position: "absolute",
    [side]: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: "4px 8px",
    cursor: "pointer",
    zIndex: 1,
  });

  const AddToCart = async (product) => {
    const decoded = jwtDecode(Token);

    let data = {
      userId: decoded.id,
      productId: product._id,
    };

    const responseData = await axios.post(
      `${Config.react_domain}/api/addtocart`,
      data
    );
    if (responseData.data.status) {
      toast.success("Product added to cart successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Product already in cart", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const Card = ({ product }) => {
    const currentImgIndex = imageIndex[product._id] || 0;

    return (
      <div
        key={product._id}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "22%",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontFamily: "sans-serif",
          position: "relative",
          flex: "1 1 calc(100% - 40px)",
        }}
      >
        {/* Image Carousel */}
        <div style={{ position: "relative", height: "220px" }}>
          <img
            src={product.allImages[currentImgIndex]}
            alt="product"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />
          <span
            onClick={() =>
              handleImageScroll(product._id, "left", product.allImages.length)
            }
            style={arrowButtonStyle("left")}
          >
            {"<"}
          </span>
          <span
            onClick={() =>
              handleImageScroll(product._id, "right", product.allImages.length)
            }
            style={arrowButtonStyle("right")}
          >
            {">"}
          </span>
        </div>

        {/* Product Info */}
        <div style={{ padding: "16px" }}>
          <h4 style={{ margin: 0, color: "#666" }}>{product.brand}</h4>
          <h3 style={{ margin: "4px 0" }}>{product.name}</h3>
          <p
            style={{
              fontSize: "14px",
              color: "#777",
              margin: "4px 0",
            }}
          >
            {truncateDescription(product.description, 50)}
          </p>
          <p style={{ margin: "4px 0", color: "#555" }}>Size: {product.size}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                ₹
                {product.price -
                  (product.price * product?.discount || 10) / 100}
              </span>
              <span
                style={{
                  textDecoration: "line-through",
                  marginLeft: "8px",
                  color: "#999",
                  fontSize: "14px",
                }}
              >
                ₹{product.price}
              </span>
            </div>
            <span
              style={{
                background: "green",
                color: "#fff",
                fontSize: "12px",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {product?.discount || 10}% OFF
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            <button
              onClick={() => AddToCart(product)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#2196F3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleLike(product._id)}
              style={{
                background: "#fff",
                border: likes[product._id] ? "1px solid red" : "1px solid #ccc",
                borderRadius: "50%",
                fontSize: "20px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: likes[product._id] ? "red" : "#888",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: likes[product._id]
                  ? "0 0 10px rgba(255, 0, 0, 0.3)"
                  : "0 0 6px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    );
  };

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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div className="grid place-items-center h-dvh bg-zinc-900/15">
        <ToastContainer />
      </div>
    </>
  );
};

export default BedsheetProductCards;
