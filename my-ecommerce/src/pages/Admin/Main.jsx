import React, { useState, useEffect } from "react";
import {
  Button,
} from "@mui/material";
import { useNavigate, Routes, Route } from "react-router-dom";

import AddProduct from "./Addproduct";
import Orders from "./Orders";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Cattegories from "./Categories";
import EditProduct from "./EditProduct";
function Sheetsets() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(200);

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

          <div className="d-flex flex-column gap-2">
          <Button
              variant="outlined"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </Button>
            <Button variant="outlined" onClick={() => navigate("/admin/users")}>
              Users
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/products")}
            >
              Products
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/add-product")}
            >
              Add Product
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/categories")}
            >
              Categories
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/orders")}
            >
              Orders
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/brands")}
            >

              Brands
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/coupons")}
            >
              Coupons
            </Button>
            
        
          </div>

          <hr className="my-4" />

       
        </div>

        {/* Main Content */}
        <div className="col-lg-10">
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Cattegories />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Sheetsets;
