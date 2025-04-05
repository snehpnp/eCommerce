import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import {fetchAllProducts} from "../../features/api/User"
import { useDispatch } from "react-redux";

function Sheetsets({ path }) {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("card");
  const [sortOrder, setSortOrder] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState(200);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [likes, setLikes] = useState({});
  const [imageIndex, setImageIndex] = useState({});

  const GetProducts = async () => {
    try {
      let Filter = { category: path };

  
      
      const response = await axios.get(`${Config.react_domain}/api/products`, {
        params: Filter,
      });
      const data = response.data.data;

      console.log("Products fetched:", data);

      selectedCategory === "All"
        ? setProducts(data)
        : setProducts(
            data.filter((product) => product.category === selectedCategory)
          );

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(); // Fallback to cached products in case of error
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config.react_domain}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await GetProducts();
      await fetchCategories();
    };
    fetchProducts();
  }, [path]);

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
                  <button className="btn btn-outline-secondary btn-sm me-2">
                    ❤️
                  </button>
                  <button className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const Card = ({ product }) => {
    const [imageFade, setImageFade] = useState(false);
    const currentImgIndex = imageIndex[product._id] || 0;
  
    const handleImageScrollWithAnimation = (productId, direction, length) => {
      setImageFade(true);
      setTimeout(() => {
        handleImageScroll(productId, direction, length);
        setImageFade(false);
      }, 200);
    };
  
    const truncateDescription = (desc = "", limit = 30) => {
      return desc.length > limit ? desc.slice(0, limit) + "..." : desc;
    };
  
    return (
      <div
        key={product._id}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "23%",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontFamily: "sans-serif",
          flex: "1 1 calc(100% - 40px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "500px", // Fix height
        }}
      >
        {/* Image Carousel */}
        <div style={{ position: "relative", height: "220px" }}>
          <img
            src={
              product.allImages[currentImgIndex] ||
              "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743851017/Image-not-found_g64396.png"
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dkqw7zkzl/image/upload/v1743851017/Image-not-found_g64396.png";
            }}
            alt="product"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              transition: "opacity 0.3s ease-in-out",
              opacity: imageFade ? 0 : 1,
            }}
          />
          <span
            onClick={() =>
              handleImageScrollWithAnimation(product._id, "left", product.allImages.length)
            }
            style={arrowButtonStyle("left")}
          >
            {"<"}
          </span>
          <span
            onClick={() =>
              handleImageScrollWithAnimation(product._id, "right", product.allImages.length)
            }
            style={arrowButtonStyle("right")}
          >
            {">"}
          </span>
        </div>
  
        {/* Product Info */}
        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h4 style={{ margin: 0, color: "#666" }}>{product.brand}</h4>
            <h3 style={{ margin: "4px 0" }}>{product.name}</h3>
            <p
              style={{
                fontSize: "14px",
                color: "#777",
                margin: "4px 0",
                minHeight: "40px",
                lineHeight: "20px",
              }}
            >
              {truncateDescription(product.description, 60)}
            </p>
            <p style={{ margin: "4px 0", color: "#555" }}>Size: {product.size}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "8px",
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
          </div>
  
          {/* Buttons */}
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
  
  const arrowButtonStyle = (side) => ({
    position: "absolute",
    [side]: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "4px 8px",
    cursor: "pointer",
    zIndex: 1,
  });

  const AddToCart = async (product) => {
    const decoded = jwtDecode(localStorage.getItem("token"));

    let data = {
      userId: decoded.id,
      productId: product._id,
    };

    const responseData = await axios.post(
      `${Config.react_domain}/api/addtocart`,
      data
    );
    if (responseData.data.status) {
      toast.success("Product added to cart successfully");
    } else {
      toast.error("Product already in cart");
    }
  };

  const truncateDescription = (text, wordLimit) => {
    const words = text.trim().split(" ");
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(" ") + "...";
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
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
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
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  padding: "16px",
                }}
              >
                {products.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <TableView products={products} />
            )}
          </div>
        </div>
      </div>

      <ToastContainer 
        position="bottom-right"
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

export default Sheetsets;
