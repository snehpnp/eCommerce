import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from '@mui/icons-material/ShoppingCart';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
// import { InputBase, IconButton, Box } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";

// Custom styled input (works like MUI's InputBase)
const StyledInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: "6px 10px",
  fontSize: "16px",
  border: "none",
  outline: "none",
}));

import {
  AccountCircle,
  Settings,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import Logo from "../assets/logo-removebg-preview.png";
import * as config from "../utils/Config";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  marginLeft: 16,
  width: "auto",
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  marginLeft: 8,
  width: "100%",
}));

export default function ResponsiveNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [userRole, setUserRole] = useState(null);
  const [CartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const [getProfileLogo, setGetProfileLogo] = useState(null);

  let navLinks = [
    { name: "Bedsheet Sets", path: "/bedsheets" },
    { name: "Pillow Covers", path: "/pillow-covers" },
    { name: "Blankets", path: "/blanket" },
    { name: "Mattress Protectors", path: "/mattress-protectors" },
    { name: "Duvet Covers", path: "/duvet-covers" },
  ]
// Bedsheets ,Pillow Covers,Pillows,Blankets,Comforters & Duvets,Mattress Protectors,Quilts & Razai,Bed Covers,Cushion Covers,Bedding Sets,Mattresses,Throws


  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/#/login"; // Redirect to login page after logout
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
    setUserRole(decoded?.role); // Save the role
     
      axios
        .get(`${config.react_domain}/api/auth/get-profile`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          if (response.data.status) {
            setGetProfileLogo(response.data.data);
            setCartCount(response.data.cartCount); // Assuming the API returns the cart count
          } else {
            console.error(
              "Failed to fetch profile data:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []);

  const adminLinks = [
    ...navLinks,
    { name: "Products", path: "/admin/products" }
  ];
  
  const userLinks = navLinks;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}

          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {" "}
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: "250px",
                  height: "81px",
                  maxHeight: "81px",
                  paddingLeft: 0,
                }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: isMobile ? 1 : 5,
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "30px",
                px: 2,
                py: 0.5,
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                width: isMobile ? "100%" : "60%",
                maxWidth: "700px",
              }}
            >
              <SearchIcon sx={{ color: "gray", mr: 1 }} />
              <StyledInput
                placeholder="Search for products, categories, brands…"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  ml: 1,
                  p: "8px",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
          {token && (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "end" }}>
              <IconButton color="inherit">
                <Badge badgeContent={10} color="error">
                  <NotificationsIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Box>
          )}

          {token && (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "end" }}>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton color="inherit">
                  <Badge badgeContent={CartCount} color="primary">
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
          )}

          <IconButton color="inherit" onClick={handleMenuOpen}>
            {getProfileLogo && getProfileLogo !== "" ? (
              <img
                src={getProfileLogo}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Logo; // fallback in case URL fails
                }}
              />
            ) : (
              <AccountCircle fontSize="large" />
            )}
          </IconButton>

          <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  PaperProps={{
    sx: {
      mt: 1.5,
      borderRadius: 3,
      minWidth: 240,
      px: 1,
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      fontFamily: "sans-serif",
    },
  }}
>
  <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
    <AccountCircle sx={{ mr: 1.5 }} />
    <span style={{ fontSize: "16px" }}>Profile</span>
  </MenuItem>

  <Link to="/favorite" style={{ textDecoration: "none", color: "inherit" }}>
    <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
      <MailIcon sx={{ mr: 1.5 }} />
      <span style={{ fontSize: "16px" }}>Favorite Products</span>
    </MenuItem>
  </Link>

  <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
    <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
      <ShoppingCart sx={{ mr: 1.5 }} />
      <span style={{ fontSize: "16px" }}>My Cart</span>
    </MenuItem>
  </Link>

  <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
    <Settings sx={{ mr: 1.5 }} />
    <span style={{ fontSize: "16px" }}>Settings</span>
  </MenuItem>

  <MenuItem
    onClick={() => {
      handleMenuClose();
      Logout();
    }}
    sx={{
      py: 1.5,
      color: "red",
      fontWeight: 500,
    }}
  >
    <LogoutIcon sx={{ mr: 1.5 }} />
    <span style={{ fontSize: "16px" }}>Logout</span>
  </MenuItem>
</Menu>

        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        style={{ width: "250px" }} // Drawer width fixed
      >
       <List style={{ padding: "10px 15px" }}>
  {(userRole === "ADMIN" ? adminLinks : userLinks).map(({ name, path }) => (
    <ListItem
      button
      key={name}
      onClick={toggleDrawer}
      component={Link}
      to={path}
      style={{
        textDecoration: "none",
        color: "#333",
        padding: "12px 15px",
        fontSize: "16px",
        fontWeight: "500",
        borderBottom: "1px solid #ddd",
        transition: "background 0.3s",
      }}
    >
      <ListItemText primary={name} />
    </ListItem>
  ))}
</List>

      </Drawer>

      {!isMobile && (
  <Box
    sx={{
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      bgcolor: "#f8f8f8",
      p: 2,
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  >
    {(userRole === "ADMIN" ? adminLinks : userLinks).map(({ name, path }) => (
      <Typography
        key={name}
        sx={{
          mx: 2,
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "8px 12px",
          borderRadius: "5px",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        <Link to={path} style={{ textDecoration: "none", color: "black" }}>
          {name}
        </Link>
      </Typography>
    ))}
  </Box>
)}

    </Box>
  );
}
