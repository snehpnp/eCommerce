import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Orders",
    value: 1200,
    path: "/orders",
    color: "#1976d2",
    icon: "🛒",
  },
  {
    label: "Completed Orders",
    value: 900,
    path: "/orders/completed",
    color: "#2e7d32",
    icon: "✅",
  },
  {
    label: "Rejected Orders",
    value: 150,
    path: "/orders/rejected",
    color: "#d32f2f",
    icon: "❌",
  },
  {
    label: "Pending Orders",
    value: 150,
    path: "/orders/pending",
    color: "#f57c00",
    icon: "⏳",
  },
  {
    label: "Total Users",
    value: 500,
    path: "/users",
    color: "#6a1b9a",
    icon: "👤",
  },
  {
    label: "New Users",
    value: 50,
    path: "/users/new",
    color: "#0288d1",
    icon: "🆕",
  },
  {
    label: "Total Revenue",
    value: "₹1,200,000",
    path: "/revenue",
    color: "#388e3c",
    icon: "💰",
  },
  {
    label: "Total Products",
    value: 300,
    path: "/products",
    color: "#fbc02d",
    icon: "📦",
  },
  {
    label: "Total Reviews",
    value: 1200,
    path: "/reviews",
    color: "#1976d2",
    icon: "⭐",
  },
  {
    label: "Total Feedback",
    value: 800,
    path: "/feedback",
    color: "#d32f2f",
    icon: "📝",
  },
  {
    label: "Total Returns",
    value: 50,
    path: "/returns",
    color: "#f57c00",
    icon: "🔄",
  },
  {
    label: "Total Discounts",
    value: "₹50,000",
    path: "/discounts",
    color: "#6a1b9a",
    icon: "💸",
  },
  {
    label: "Total Wishlist",
    value: 200,
    path: "/wishlist",
    color: "#0288d1",
    icon: "❤️",
  },
  {
    label: "Total Cart",
    value: 300,
    path: "/cart",
    color: "#388e3c",
    icon: "🛒",
  },
  {
    label: "Total Payments",
    value: "₹1,000,000",
    path: "/payments",
    color: "#fbc02d",
    icon: "💳",
  },
  {
    label: "Total Shipping",
    value: "₹100,000",
    path: "/shipping",
    color: "#1976d2",
    icon: "🚚",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        📊 Dashboard Overview
      </Typography>

      <div className="row">
        {stats.map((item, index) => (
          <div className="col-lg-3 mt-3 " key={index}>
            <Card
              onClick={() => navigate(item.path)}
              style={{
                cursor: "pointer",
                backgroundColor: item.color,
                color: "#fff",
                transition: "transform 0.2s",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.icon} {item.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
