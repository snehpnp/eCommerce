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

import AddProduct from "./Addproduct";
import Orders from "./Orders";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Products from "./Products";

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
              onClick={() => navigate("/admin/orders")}
            >
              Orders
            </Button>
            <Button variant="outlined" onClick={() => navigate("/admin/users")}>
              Users
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Sheetsets;
