import React, { useState } from "react";
import { Switch, Button } from "@mui/material";

const sampleOrders = Array.from({ length: 45 }, (_, index) => ({
  id: `ORD${100 + index}`,
  customer: `Customer ${index + 1}`,
  product: `Product ${index + 1}`,
  amount: `₹${(500 + index * 10).toFixed(2)}`,
  status: index % 3 === 0 ? "Shipped" : index % 3 === 1 ? "Processing" : "Delivered",
}));

const OrdersPage = () => {
  const [isTableView, setIsTableView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const handleChange = (event) => setIsTableView(event.target.checked);

  const handleExport = () => {
    const header = "No,Order ID,Customer,Product,Amount,Status\n";
    const rows = currentOrders
      .map(
        (order, index) =>
          `${index + 1 + (currentPage - 1) * ordersPerPage},${order.id},${order.customer},${order.product},${order.amount},${order.status}`
      )
      .join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + header + rows;
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(sampleOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sampleOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        flexWrap: "wrap"
      }}>
        <h2 style={{ margin: 0 }}>🛒 Ecommerce Orders</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button onClick={handleExport} variant="contained" color="success">
            Export CSV
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>Card</span>
            <Switch checked={isTableView} onChange={handleChange} />
            <span>Table</span>
          </div>
        </div>
      </div>

      {/* Table View */}
      {isTableView ? (
        <div style={{ overflowX: "auto", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "800px",
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order.id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                  <td style={tdStyle}>{order.id}</td>
                  <td style={tdStyle}>{order.customer}</td>
                  <td style={tdStyle}>{order.product}</td>
                  <td style={tdStyle}>{order.amount}</td>
                  <td style={tdStyle}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {currentOrders.map((order, index) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                width: "250px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h4>{order.product}</h4>
              <p><strong>No:</strong> {index + 1 + (currentPage - 1) * ordersPerPage}</p>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Customer:</strong> {order.customer}</p>
              <p><strong>Amount:</strong> {order.amount}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{
        marginTop: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        <Button variant="outlined" onClick={handlePrev} disabled={currentPage === 1}>
          ⬅ Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages}>
          Next ➡
        </Button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "2px solid #ddd"
};

const tdStyle = {
  padding: "10px",
};

export default OrdersPage;
