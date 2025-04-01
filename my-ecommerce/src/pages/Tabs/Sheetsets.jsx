import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Luxury Sheet Set",
    description: "Soft and comfortable cotton sheets",
    price: 99.99,
    discountPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3",
    category: "Cotton",
  },
  {
    id: 2,
    name: "Silk Sheet Set",
    description: "Premium silk sheets for a luxurious feel",
    price: 129.99,
    discountPrice: 109.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3",
    category: "Silk",
  },
  {
    id: 3,
    name: "Bamboo Sheet Set",
    description: "Eco-friendly and breathable bamboo sheets",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3",
    category: "Bamboo",
  },
  {
    id: 4,
    name: "Linen Sheet Set",
    description: "Durable and comfortable linen sheets",
    price: 109.99,
    discountPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3",
    category: "Linen",
  },
];

function Sheetsets() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("card");
  const [sortOrder, setSortOrder] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState(200);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container-fluid" >
      <h1 className="text-center my-4" style={{ fontWeight: "bold" }}>
        Sheet Sets Collection
      </h1>
      <div className="row">
        <div
          className="col-lg-2"
          style={{
            padding: "0 20px",
            background: "#f8f9fa",
            borderRadius: "8px",
            paddingBottom: "15px",
          }}
        >
          <h4 className="text-start my-4" style={{ fontWeight: "bold" }}>
            Filters
          </h4>

          {/* Category Filter */}
          <div className="filter-section" style={{ marginBottom: "15px" }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Category:
            </label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="All">All</option>
              <option value="Cotton">Cotton</option>
              <option value="Silk">Silk</option>
              <option value="Bamboo">Bamboo</option>
              <option value="Linen">Linen</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div className="availability-filter" style={{ marginBottom: "15px" }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Availability:
            </label>
            <select
              onChange={(e) => setAvailability(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="all">All</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="price-filter">
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Price Range:
            </label>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                width: "100%",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                display: "block",
                textAlign: "right",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              Up to ${priceRange}
            </span>
          </div>
        </div>

        <div className="col-lg-10 col-md-8 col-sm-12">
          <div className="top-section">
            {/* Sort Section */}
            <div
              className="sort-section"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                background: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                Sort By:
              </label>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: "6px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <option value="default">Default</option>
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
                <option value="bestSelling">Best Selling</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="dateNewOld">Date: New to Old</option>
                <option value="dateOldNew">Date: Old to New</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div
              className="view-mode-toggle"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                View Mode:
              </label>

              <div style={{ position: "relative", width: "60px", height: "30px" }}>
                <input
                  type="checkbox"
                  id="toggleView"
                  checked={viewMode === "table"}
                  onChange={() => setViewMode(viewMode === "card" ? "table" : "card")}
                  style={{ display: "none" }}
                />

                {/* Toggle Switch Background */}
                <label
                  htmlFor="toggleView"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    background: viewMode === "card" ? "#ddd" : "#4CAF50",
                    borderRadius: "15px",
                    position: "absolute",
                    cursor: "pointer",
                    transition: "background 0.3s ease-in-out",
                  }}
                ></label>

                {/* Toggle Circle with Icon */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: viewMode === "card" ? "5px" : "35px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 0 3px rgba(0,0,0,0.3)",
                    transition: "left 0.3s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {viewMode === "table" ? (
                    <i className="fas fa-table" style={{ fontSize: "12px", color: "#4CAF50" }}></i>
                  ) : (
                    <i className="fas fa-th" style={{ fontSize: "12px", color: "#999" }}></i>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="product-list">
            {viewMode === "card" ? (
              <div className="product-container">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div>
                      {product.discountPrice ? (
                        <>
                          <span className="original-price">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="discount-price">
                            ${product.discountPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="table-image"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>
                        {product.discountPrice ? (
                          <>
                            <span className="original-price">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="discount-price">
                              ${product.discountPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sheetsets;
