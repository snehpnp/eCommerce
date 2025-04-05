import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";

function Sheetsets({ path }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("card");
  const [sortOrder, setSortOrder] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState(200);
  const [products, setProducts] = useState([]);

  const GetProducts = async () => {
    try {
      let Filter = { category: path };
      const response = await axios.get(`${Config.react_domain}/api/products`, { params: Filter });
      const data = response.data;

      selectedCategory === "All"
        ? setProducts(data)
        : setProducts(
            data.filter((product) => product.category === selectedCategory)
          );

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(cachedProducts); // Fallback to cached products in case of error
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      await GetProducts();
    };
    fetchProducts();
  }, []);
  const CardView = ({ products }) => {
    return (
      <div
        className="product-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card1 shadow-sm"
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Images */}
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                marginBottom: "10px",
              }}
            >
              {product.allImages?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`product-${i}`}
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "8px",
                  }}
                />
              ))}
            </div>

            {/* Info */}
            <h5 style={{ fontWeight: "bold" }}>{product.name}</h5>
            <p style={{ fontSize: "14px", color: "#666" }}>
              {product.description}
            </p>
            <p style={{ fontWeight: "bold", color: "#28a745" }}>
              ${product.price.toFixed(2)}
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-outline-secondary btn-sm">❤️</button>
              <button className="btn btn-primary btn-sm">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const TableView = ({ products }) => {
    return (
      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={{ whiteSpace: "nowrap" }}>
                  {product.allImages?.slice(0, 2).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`product-${i}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginRight: "5px",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2">❤️</button>
                  <button className="btn btn-primary btn-sm">Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="container-fluid">
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

              <div
                style={{ position: "relative", width: "60px", height: "30px" }}
              >
                <input
                  type="checkbox"
                  id="toggleView"
                  checked={viewMode === "table"}
                  onChange={() =>
                    setViewMode(viewMode === "card" ? "table" : "card")
                  }
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
                    <i
                      className="fas fa-table"
                      style={{ fontSize: "12px", color: "#4CAF50" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-th"
                      style={{ fontSize: "12px", color: "#999" }}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="product-list">
            {viewMode === "card" ? (
              <CardView products={products} />
            ) : (
              <TableView products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sheetsets;
