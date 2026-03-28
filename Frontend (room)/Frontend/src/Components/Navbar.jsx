import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slide,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Profile from "../assets/Profile.png";
import "@qpokychuk/sf-pro-display";

const Notification = ({ open, onClose }) => {
  const notificationMessages = [
    "Your booking for Paris is confirmed!",
    "New hotel deal available in Tokyo!",
    "Your flight to New York is scheduled for next week.",
    "Special offer: 20% off Maldives resorts!",
    "Your car rental in London is ready.",
    "Check-in reminder for your Miami hotel.",
  ];

  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (open) {
      const randomIndex = Math.floor(
        Math.random() * notificationMessages.length
      );
      setCurrentMessage(notificationMessages[randomIndex]);
    }
  }, [open]);

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Paper
        sx={{
          position: "fixed",
          top: { xs: 56, sm: 68 },
          right: 0,
          width: { xs: "100%", sm: "min(400px, 80vw)" },
          height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 68px)" },
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "'SF Pro Display', sans-serif",
            color: "#333333",
            fontSize: { xs: 14, sm: 16, md: 18 },
            fontWeight: 500,
            textAlign: "center",
            px: 2,
          }}
        >
          {currentMessage || "No new notifications"}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#2F80ED",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: { xs: 12, sm: 14 },
            }}
          >
            Close
          </Typography>
        </IconButton>
      </Paper>
    </Slide>
  );
};

const Navbar = ({ scrollToFooter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const open = Boolean(anchorEl);

  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  const username = user?.Email ? user.Email.split("@")[0] : null;

  const getActiveNavItem = () => {
    const path = location.pathname;
    if (path === "/home") return "Home";
    if (path === "/discover") return "Discover";
    if (path === "/activities") return "Activities";
    if (path === "/home" && location.state?.scrollTo === "footer") {
      return location.hash === "#contact" ? "Contact" : "About";
    }
    return "";
  };

  const activeNavItem = getActiveNavItem();

  const handleProfileClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/SignIn");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    handleMenuClose();
    navigate("/SignIn");
  };

  const handleNavClick = (item) => {
    setMobileOpen(false);
    if (item === "About" || item === "Contact") {
      if (location.pathname === "/home" && scrollToFooter) {
        scrollToFooter();
      } else {
        navigate("/home", { state: { scrollTo: "footer" } });
      }
    } else if (item === "Activities") {
      navigate("/activities");
    } else if (item === "Home") {
      navigate("/home");
    } else if (item === "Discover") {
      navigate("/discover");
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const drawer = (
    <Box sx={{ width: "min(250px, 80vw)", p: 2 }}>
      <List>
        {["Home", "Discover", "Activities", "About", "Contact"].map((item) => (
          <ListItem
            key={item}
            onClick={() => handleNavClick(item)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: { xs: 14, sm: 16 },
                color: activeNavItem === item ? "#2F80ED" : "#333333",
                fontWeight: activeNavItem === item ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          height: { xs: 56, sm: 68 },
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: "56px !important", sm: "68px !important" },
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <img
              src={Logo}
              alt="Plane Logo"
              style={{ width: "20px", height: "20px" }}
            />
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontWeight: 500,
                fontSize: { xs: 14, sm: 16, md: 18 },
                lineHeight: { xs: "17px", sm: "19px", md: "21px" },
                letterSpacing: "0.02em",
                color: "#1B1F2D",
              }}
            >
              My Dream Place
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            {["Home", "Discover", "Activities", "About", "Contact"].map(
              (item) => (
                <Typography
                  key={item}
                  onClick={() => handleNavClick(item)}
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: activeNavItem === item ? 600 : 400,
                    fontSize: { xs: 12, sm: 14, md: 16 },
                    lineHeight: "19px",
                    letterSpacing: "0.02em",
                    color: activeNavItem === item ? "#2F80ED" : "#333333",
                    cursor: "pointer",
                    "&:hover": { color: "#2F80ED" },
                    textDecoration:
                      activeNavItem === item ? "underline" : "none",
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <IconButton
              sx={{ padding: 0, display: { xs: "none", sm: "flex" } }}
              onClick={handleNotificationClick}
            >
              <NotificationsIcon
                sx={{
                  fontSize: { xs: 18, sm: 20, md: 24 },
                  color: "#828282",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: { xs: 6, sm: 8 },
                  height: { xs: 6, sm: 8 },
                  backgroundColor: "#EB5757",
                  border: "2px solid #FFFFFF",
                  borderRadius: "50%",
                  top: { xs: 2, sm: 3 },
                  right: { xs: 2, sm: 3 },
                }}
              />
            </IconButton>
            <Avatar
              src={Profile}
              alt="Profile"
              sx={{
                width: { xs: 28, sm: 36, md: 44 },
                height: { xs: 28, sm: 36, md: 44 },
                cursor: "pointer",
              }}
              onClick={handleProfileClick}
            />
            <IconButton
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{ mt: "8px" }}
          >
            {username && (
              <MenuItem
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  color: "#2F80ED",
                }}
              >
                {username}
              </MenuItem>
            )}
            <MenuItem
              onClick={handleLogout}
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                color: "#2F80ED",
              }}
            >
              Log out
            </MenuItem>
          </Menu>

          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {drawer}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Notification open={notificationOpen} onClose={handleNotificationClose} />
    </>
  );    
};

export default Navbar;
