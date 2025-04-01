import React, { useState } from "react";
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
import Logo from "../assets/logo.jpg";

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

  const navLinks = [
    { name: "Sheet Sets", path: "/sheet-sets" },
    { name: "Fitted Sheets", path: "/fitted-sheets" },
    { name: "Flat Sheets", path: "/flat-sheets" },
    { name: "Pillow Cases", path: "/pillow-cases" },
    { name: "Bed Covers", path: "/bed-covers" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "start" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={Logo} alt="Logo" style={{ width: "250px", height: "81px", maxHeight: "81px" }} />
            </Link>
          </Box>
       
          <Box sx={{ flexGrow: 25, display: "flex", alignItems: "start" }}>
          <Search>
            <SearchIcon />
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
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
            <AccountCircle fontSize="large" />
          </IconButton>

        
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <List>
          {navLinks.map(({ name, path }) => (
            <ListItem button key={name} onClick={toggleDrawer} component={Link} to={path}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent: "left", bgcolor: "#eee", p: 2 }}>
          {navLinks.map(({ name, path }) => (
            <Typography key={name} sx={{ mx: 2, cursor: "pointer", fontWeight: "bold" }}>
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