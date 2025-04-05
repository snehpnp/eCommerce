import React, { useState } from "react";

const products = [
  {
    id: 1,
    brand: "DreamHome",
    name: "Cotton Bedsheet",
    size: "Queen Size",
    description: "Soft and breathable cotton bedsheet with vibrant prints.",
    images: [
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/Mattress_Protector_i7qke7.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/nathan-waters-zukdSYdFB_A-unsplash_ujnrjw.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510683/jacinta-christos-BDJy8J3R4GY-unsplash_fjhzkd.jpg",
    ],
    price: 1200,
    discount: 20,
  },
  {
    id: 2,
    brand: "SleepWell",
    name: "Silk Bedsheet",
    size: "King Size",
    description: "Luxurious silk bedsheet for premium comfort.",
    images: [
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510683/jacinta-christos-BDJy8J3R4GY-unsplash_fjhzkd.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/Mattress_Protector_i7qke7.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/nathan-waters-zukdSYdFB_A-unsplash_ujnrjw.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510683/jacinta-christos-BDJy8J3R4GY-unsplash_fjhzkd.jpg"
    ],
    price: 2200,
    discount: 15,
  },
  {
    id: 3,
    brand: "CozyNest",
    name: "Linen Bedsheet",
    size: "Single Size",
    description: "Durable and stylish linen bedsheet for daily use.",
    images: [
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/nathan-waters-zukdSYdFB_A-unsplash_ujnrjw.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/Mattress_Protector_i7qke7.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510683/jacinta-christos-BDJy8J3R4GY-unsplash_fjhzkd.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510439/Couple_nbbuxc.jpg"
    ],
    price: 999,
    discount: 10,
  },
  {
    id: 4,
    brand: "HomeStyle",
    name: "Floral Bedsheet",
    size: "Double Size",
    description: "Beautiful floral bedsheet to brighten up your room.",

    images: [
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510683/jacinta-christos-BDJy8J3R4GY-unsplash_fjhzkd.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/Mattress_Protector_i7qke7.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510684/nathan-waters-zukdSYdFB_A-unsplash_ujnrjw.jpg",
      "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743510439/Couple_nbbuxc.jpg"
    ],
    price: 1500,
    discount: 25,
  }
];

const BedsheetProductCards = () => {
  const [likes, setLikes] = useState({});
  const [imageIndex, setImageIndex] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  const Card = ({ product }) => {
    const currentImgIndex = imageIndex[product.id] || 0;

    return (
      <div
        key={product.id}
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
            src={product.images[currentImgIndex]}
            alt="product"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />
          <button
            onClick={() =>
              handleImageScroll(product.id, "left", product.images.length)
            }
            style={arrowButtonStyle("left")}
          >
            ◀
          </button>
          <button
            onClick={() =>
              handleImageScroll(product.id, "right", product.images.length)
            }
            style={arrowButtonStyle("right")}
          >
            ▶
          </button>
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
          <p style={{ margin: "4px 0", color: "#555" }}>
            Size: {product.size}
          </p>
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
                  (product.price * product.discount) / 100}
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
              {product.discount}% OFF
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
              onClick={() => toggleLike(product.id)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                color: likes[product.id] ? "red" : "#888",
                cursor: "pointer",
              }}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
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
  );
};

export default BedsheetProductCards;