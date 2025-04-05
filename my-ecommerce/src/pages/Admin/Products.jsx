import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../../utils/Config";
import {
  Button,
  IconButton,
  CircularProgress,
  Box,
  Switch,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate, Routes, Route } from "react-router-dom";

function Sheetsets() {
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
  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    setIsTableView(event.target.checked);
    setViewMode(event.target.checked ? "table" : "card");
  };

  const GetProducts = async () => {
    try {
      setLoader(true);
      let FilteredProducts = {
        category: selectedCategory,
        availability: availability,
        priceRange: priceRange,
      };
      const response = await axios.get(`${Config.react_domain}/api/products`, {
        params: FilteredProducts,
      });
      setProducts(response.data.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    GetProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config.react_domain}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Config.react_domain}/api/products/${id}`);
      GetProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-lg-12">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        {/* Title */}
        <h2
          className="mb-0 d-flex align-items-center"
          style={{ flex: "1 1 200px" }}
        >
          📦 Products
        </h2>

        {/* Sort */}
        <div className="d-flex align-items-center gap-2">
          <label className="fw-bold mb-0">Sort By:</label>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select form-select-sm"
            style={{ minWidth: "120px" }}
          >
            <option value="default">Default</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        {/* Category */}
        <div className="d-flex align-items-center gap-2">
          <label className="fw-bold mb-0">Category:</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select form-select-sm"
            style={{ minWidth: "130px" }}
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="d-flex align-items-center gap-2">
          <label className="fw-bold mb-0">Search:</label>
          <input
            type="text"
            placeholder="Search products..."
            className="form-control form-control-sm"
            style={{ minWidth: "180px" }}
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setProducts((prevProducts) =>
                prevProducts.filter((product) =>
                  product.name.toLowerCase().includes(searchTerm)
                )
              );
            }}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="d-flex align-items-center gap-2">
          <Switch checked={isTableView} onChange={handleChange} />
          <span className="small">
            {isTableView ? "Table View" : "Card View"}
          </span>
        </div>

        {/* Add Button */}
        <Button
          variant="contained"
          startIcon={<Add />}
          size="small"
          onClick={() => navigate("/admin/add-product")}
        >
          Add Product
        </Button>
      </div>

      {loader ? (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : viewMode === "card" ? (
        <div className="row">
          {currentProducts.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="card__img1"
                />
                <div className="card-body">
                  <h5 className="card-title">{`${product.name} (${product.brand})`}</h5>
                  <p>{product.description}</p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Availability:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>${product.price.toFixed(2)}</strong>
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
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
              <th>Category</th>
              <th>Availability</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    style={{ width: "50px", height: "50px" }}
                    className="card__img"
                  />
                </td>
                <td>{`${product.name} (${product.brand})`}</td>
                <td>{product.description?.substring(0, 50)}...</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
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
  );
}

export default Sheetsets;
