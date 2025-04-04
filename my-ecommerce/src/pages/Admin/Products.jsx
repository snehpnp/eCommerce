import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";
import { Button, IconButton, CircularProgress, Box } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Switch from "@mui/material/Switch";

function Sheetsets({ path }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("card");
  const [sortOrder, setSortOrder] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState(200);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [loader, setLoader] = useState(false);
  
  const [isTableView, setIsTableView] = useState(true);

  const handleChange = (event) => {
    setIsTableView(event.target.checked);
  };


  const GetProducts = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${Config.react_domain}/api/products`);
      setProducts(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // fallback
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Config.react_domain}/api/products/${id}`);
      GetProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log("priceRange:", priceRange);
    console.log("availability:", availability);
    console.log("selectedCategory:", selectedCategory);
  }, [priceRange, availability, selectedCategory]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Filters */}
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
          <div className="filter-section">
            <label style={{ fontWeight: "bold" }}>Category:</label>
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
          <div className="availability-filter mt-3">
            <label style={{ fontWeight: "bold" }}>Availability:</label>
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

          {/* Price Filter */}
          <div className="price-filter mt-3">
            <label style={{ fontWeight: "bold" }}>Price Range:</label>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ width: "100%" }}
            />
            <span style={{ display: "block", textAlign: "right" }}>
              Up to ${priceRange}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 col-md-8 col-sm-12">
          <div className="top-section d-flex justify-content-between align-items-center mb-3">
            {/* Sorting */}
            <div className="d-flex align-items-center gap-2">
              <label style={{ fontWeight: "bold" }}>Sort By:</label>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: "6px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="default">Default</option>
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
              </select>
            </div>

          

            <Switch
  checked={isTableView}
  onChange={handleChange}
  inputProps={{ "aria-label": "Toggle view" }}
/>
<span>{isTableView ? "Table View" : "Card View"}</span>

            {/* Add Product */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => navigate("/admin/add-product")}
              style={{ marginLeft: "auto" }}
            >
              Add Product
            </Button>
          </div>
          {loader ? (
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CircularProgress />
            </Box>
          ) : viewMode === "card" ? (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={product.mainImage}
                      className="card__img1"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p>
                        <strong>${product.price.toFixed(2)}</strong>
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <IconButton
                        color="primary"
                        onClick={() => alert("Edit product: " + product._id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="card__img"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <IconButton
                        color="primary"
                        onClick={() => alert("Edit product: " + product._id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Delete />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="pagination d-flex justify-content-center mt-4">
            {[...Array(totalPages).keys()].map((num) => (
              <Button
                key={num + 1}
                variant={currentPage === num + 1 ? "contained" : "outlined"}
                onClick={() => handlePageChange(num + 1)}
                style={{ margin: "0 5px" }}
              >
                {num + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sheetsets;
