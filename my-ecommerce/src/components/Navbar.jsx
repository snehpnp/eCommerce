import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
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

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const [getProfileLogo , setGetProfileLogo] = useState(null);

  const navLinks = [
    { name: "Sheet Sets", path: "/sheet-sets" },
    { name: "Fitted Sheets", path: "/fitted-sheets" },
    { name: "Flat Sheets", path: "/flat-sheets" },
    { name: "Pillow Cases", path: "/pillow-cases" },
    { name: "Bed Covers", path: "/bed-covers" },
  ];

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/#/login"; // Redirect to login page after logout
  };

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${config.react_domain}/api/auth/get-profile`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log("Profile data:", response.data);
          if(response.data.status) {
            setGetProfileLogo(response.data.data);
          }
          else {
            console.error("Failed to fetch profile data:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []);


  console.log("Profile Logo:222", getProfileLogo);

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
          </Box>

          <Box sx={{ flexGrow: 25, display: "flex", alignItems: "start" }}>
            <Search>
              <SearchIcon />
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "end" }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon fontSize="large" />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={10} color="error">
                <NotificationsIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Box>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            {getProfileLogo ? (
              <img
                src={getProfileLogo}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
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
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={() => Logout()}>Logout</MenuItem>
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
          {navLinks.map(({ name, path }) => (
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
                borderBottom: "1px solid #ddd", // Light separator for menu items
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
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
            bgcolor: "#f8f8f8", // Light gray background
            p: 2,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow for depth
          }}
        >
          {navLinks.map(({ name, path }) => (
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
                "&:hover": {
                  background: "#ddd", // Light gray on hover
                  color: "#000",
                },
              }}
            >
              <Link
                to={path}
                style={{ textDecoration: "none", color: "black" }}
              >
                {name}
              </Link>
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
