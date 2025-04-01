import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaTag } from "react-icons/fa"; // Classic Icons
import img1 from "../assets/Images/Bed Skirt.jpg";
import img2 from "../assets/Images/Both.jpg";
import img3 from "../assets/Images/Comforter Sets.jpg";
import img4 from "../assets/Images/dex-ezekiel-rYPW3gKsbYc-unsplash.jpg";

const cachedProducts = [
  {
    id: 1,
    name: "Bed Skirt",
    image: img1,
    oldPrice: 990.0,
    newPrice: 749.0,
    offer: "Limited Time Offer!",
  },
  {
    id: 2,
    name: "Both",
    image: img2,
    oldPrice: 990.0,
    newPrice: 749.0,
    offer: "Summer Sale - 20% Off!",
  },
  {
    id: 3,
    name: "Comforter Sets",
    image: img3,
    oldPrice: 990.0,
    newPrice: 749.0,
    offer: "",
  },
  {
    id: 4,
    name: "Premium Comforter",
    image: img4,
    oldPrice: 1200.0,
    newPrice: 999.0,
    offer: "Buy 1 Get 1 Free!",
  },
];

function Shop({name}) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    // Cache se products load kar rahe hain
    setProducts(cachedProducts);
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: "70px", marginBottom: "50px" }}>
      <h4 style={{ textAlign: "center" ,marginBottom: "30px"}}>
        <strong>{name}</strong>
      </h4>
      <main className="main bd-grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <div className="card__img">
              <img src={product.image} alt={product.name} className="card__img" />
            </div>
            <div className="card__name">
              <p>{product.name}</p>
            </div>
            <div className="card__precis">
              <FaHeart className="icon" style={{ color: "red", cursor: "pointer" }} />
              <div>
                <span className="card__preci card__preci--before" style={{ textDecoration: "line-through", color: "gray" }}>
                  ${product.oldPrice.toFixed(2)}
                </span>
                <span className="card__preci card__preci--now" style={{ color: "red", fontWeight: "bold" }}>
                  ${product.newPrice.toFixed(2)}
                </span>
              </div>
              <FaShoppingCart className="icon" style={{ color: "green", cursor: "pointer" }} />
            </div>

            {/* {product.offer && (
              <div className="offer-banner" style={{ background: "#ff9800", color: "white", padding: "5px", borderRadius: "5px", textAlign: "center", marginTop: "10px" }}>
                <FaTag /> {product.offer}
              </div>
            )} */}

            {/* <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaShoppingCart /> Add to Cart
            </button> */}
          </article>
        ))}
      </main>
    </div>
  );
}

export default Shop;
