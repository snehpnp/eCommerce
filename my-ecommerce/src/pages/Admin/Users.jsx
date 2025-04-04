import React, { useState } from "react";
import { Button, Switch, Modal, Box } from "@mui/material";

// Dummy Users & Order Data
const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  phone: `99999${i + 1}`,
}));

const allOrders = Array.from({ length: 50 }, (_, i) => ({
  userId: (i % 10) + 1,
  orderId: `ORD-${1000 + i}`,
  product: `Product ${i + 1}`,
  amount: `₹${(i + 1) * 120}`,
  status: i % 2 === 0 ? "Delivered" : "Shipped",
}));

const UsersPage = () => {
  const [isTableView, setIsTableView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = () => setIsTableView(!isTableView);
  const handleExport = () => {
    const header = "ID,Name,Email,Phone\n";
    const rows = users
      .map((u) => `${u.id},${u.name},${u.email},${u.phone}`)
      .join("\n");
    const csv = "data:text/csv;charset=utf-8," + header + rows;
    const encoded = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewOrders = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const thStyle = {
    padding: "12px",
    fontWeight: "bold",
    textAlign: "center",
    background: "#f0f0f0",
  };
  const tdStyle = {
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>👥 User List</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button onClick={handleExport} variant="contained" color="success">Export</Button>
          <span>Card</span>
          <Switch checked={isTableView} onChange={handleChange} />
          <span>Table</span>
        </div>
      </div>

      {/* View */}
      {isTableView ? (
        <div style={{ overflowX: "auto", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", minWidth: "800px" }}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.phone}</td>
                  <td style={tdStyle}>
                    <Button onClick={() => handleViewOrders(user)} variant="outlined" size="small">View Orders</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {currentUsers.map((user) => (
            <div key={user.id} style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              width: "250px",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}>
              <h4>{user.name}</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <Button onClick={() => handleViewOrders(user)} variant="outlined" size="small">View Orders</Button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Button variant="outlined" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>⬅ Prev</Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button variant="outlined" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>Next ➡</Button>
      </div>

      {/* Order Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, bgcolor: 'background.paper',
          boxShadow: 24, p: 4, borderRadius: '10px'
        }}>
          <h3>🧾 Order History - {selectedUser?.name}</h3>
          <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders
                .filter((order) => order.userId === selectedUser?.id)
                .map((order) => (
                  <tr key={order.orderId}>
                    <td style={tdStyle}>{order.orderId}</td>
                    <td style={tdStyle}>{order.product}</td>
                    <td style={tdStyle}>{order.amount}</td>
                    <td style={tdStyle}>{order.status}</td>
                  </tr>
                ))}
              {allOrders.filter((o) => o.userId === selectedUser?.id).length === 0 && (
                <tr><td colSpan="4" style={tdStyle}>No orders found</td></tr>
              )}
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersPage;
