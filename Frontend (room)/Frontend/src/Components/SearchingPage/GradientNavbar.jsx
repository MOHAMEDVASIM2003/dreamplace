import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Stack,
  IconButton,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Avatar,
  Slide,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/WhiteLogo.png";
import Profile from "../../assets/Profile.png";
import locationIcon from "../../assets/locationIcon.png";
import calendarIcon from "../../assets/calendar-1.png";
import userSquare from "../../assets/user-square-1.png";

const GradientBackground = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "210px",
  background: "linear-gradient(180deg, #2969BF 0%, #144E9D 100%)",
  position: "relative",
  zIndex: 1,
}));

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

  // Check if user is logged in by checking localStorage or sessionStorage
  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  const username = user?.Email ? user.Email.split("@")[0] : null;

  // Determine the active navigation item based on the current pathname
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
        position="absolute"
        sx={{
          width: { xs: "100%", md: "1440px" },
          maxWidth: "100%",
          height: "68px",
          left: { xs: 0, md: "40px" },
          top: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "68px !important",
            padding: { xs: "0 12px", sm: "0 24px", md: "0 55px" },
          }}
        >
          {/* Logo + Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, md: 1 },
            }}
          >
            <img
              src={Logo}
              alt="Plane Logo"
              style={{
                width: "20px",
                height: "20px",
                marginTop: "-5px",
              }}
            />
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                lineHeight: { xs: "17px", sm: "19px", md: "21px" },
                letterSpacing: "0.02em",
                color: "#FFFFFF",
              }}
            >
              My Dream Place
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 6 }}
            sx={{
              height: "19px",
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
                    fontStyle: "normal",
                    fontWeight: activeNavItem === item ? 600 : 400,
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    lineHeight: "19px",
                    letterSpacing: "0.02em",
                    color: activeNavItem === item ? "#FFFFFF" : "#FFFFFF",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#D1E0FF", // Lighter shade for hover
                    },
                    borderBottom: activeNavItem === item ? "2px solid #FFFFFF" : "none", // Underline for active item
                    paddingBottom: activeNavItem === item ? "2px" : "0", // Align with underline
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Stack>

          {/* Notification & Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "8px", sm: "12px", md: "20px" },
            }}
          >
            <IconButton
              sx={{ position: "relative", padding: 0 }}
              onClick={handleNotificationClick}
            >
              <NotificationsIcon
                sx={{
                  fontSize: { xs: "18px", sm: "20px", md: "24px" },
                  color: "#FFFFFF",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: { xs: "6px", sm: "8px", md: "10px" },
                  height: { xs: "6px", sm: "8px", md: "10px" },
                  backgroundColor: "#EB5757",
                  border: "2px solid #FFFFFF",
                  borderRadius: "50%",
                  top: { xs: "1px", sm: "1px", md: "2px" },
                  right: { xs: "1px", sm: "1px", md: "2px" },
                }}
              />
            </IconButton>
            <Avatar
              src={Profile}
              alt="Profile"
              sx={{
                width: { xs: "32px", sm: "36px", md: "44px" },
                height: { xs: "32px", sm: "36px", md: "44px" },
                cursor: "pointer",
              }}
              onClick={handleProfileClick}
            />
            <IconButton
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: "#FFFFFF" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{
                mt: "8px",
              }}
            >
              {username && (
                <MenuItem
                  disabled
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    color: "blue",
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
          </Box>
        </Toolbar>
      </AppBar>
      <Notification open={notificationOpen} onClose={handleNotificationClose} />
    </>
  );
};

const SearchBar = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("");
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const response = await axios.get(
          "http://localhost:3002/api/getproperties"
        );
        const uniqueCountries = [
          ...new Set(response.data.map((property) => property.country)),
        ].filter(Boolean);
        setCountries(
          uniqueCountries.length > 0
            ? uniqueCountries
            : ["USA", "Canada", "UK", "Australia"]
        );
      } catch (error) {
        console.warn("Error fetching countries from API:", error);
        setError("Failed to load countries. Using default options.");
        setCountries(["USA", "Canada", "UK", "Australia"]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  const handleLocationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocationClose = (country) => {
    if (country) {
      setSelectedCountry(country);
    }
    setAnchorEl(null);
  };

  const handleCalendarClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.showPicker();
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleDateChange = (date, setDate) => {
    setDate(date);
  };

  const handleGuestsChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setGuests(value);
    }
  };

  const handleSearch = () => {
    navigate("/search-results", {
      state: {
        country: selectedCountry || "Australia",
        checkInDate,
        checkOutDate,
        guests: guests ? parseInt(guests, 10) : null,
      },
    });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: { xs: "90%", sm: "1030px" },
        left: { xs: "5%", sm: "calc(50% - 515px)" },
        top: "180px",
        background: "rgba(255, 255, 255, 1)",
        boxShadow: "0px 4px 37px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        padding: { xs: 2, sm: 1 },
        zIndex: 10,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: "100%", alignItems: "center", flexWrap: "wrap" }}
      >
        <TextField
          placeholder={selectedCountry || "Where are you going?"}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={locationIcon}
                  alt="Location"
                  style={{ width: 17, height: 20, cursor: "pointer" }}
                  onClick={handleLocationClick}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            background: "#F2F2F2",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              height: "43px",
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: "14px",
              color: "#4F4F4F",
              letterSpacing: "0.02em",
              "& fieldset": { border: "none" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(79, 79, 79, 1)",
              opacity: 1,
            },
            width: { xs: "100%", sm: "260px" },
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleLocationClose(null)}
          PaperProps={{
            style: {
              maxHeight: 200,
              width: "200px",
            },
          }}
        >
          {loadingCountries ? (
            <MenuItem disabled>
              <Typography>Loading countries...</Typography>
            </MenuItem>
          ) : error ? (
            <MenuItem disabled>
              <Typography color="error">Error loading countries</Typography>
            </MenuItem>
          ) : (
            countries.map((country) => (
              <MenuItem
                key={country}
                onClick={() => handleLocationClose(country)}
              >
                {country}
              </MenuItem>
            ))
          )}
        </Menu>

        <Box sx={{ position: "relative", width: { xs: "100%", sm: "170px" } }}>
          <TextField
            placeholder="Check in date"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={calendarIcon}
                    alt="Calendar"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
                    onClick={() => handleCalendarClick(checkInRef)}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#F2F2F2",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "43px",
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "14px",
                color: "#4F4F4F",
                letterSpacing: "0.02em",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(79, 79, 79, 1)",
                opacity: 1,
              },
              width: { xs: "100%", sm: "170px" },
            }}
          />
          <input
            type="date"
            ref={checkInRef}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            onChange={(e) => handleDateChange(e.target.value, setCheckInDate)}
          />
        </Box>

        <Box sx={{ position: "relative", width: { xs: "100%", sm: "170px" } }}>
          <TextField
            value={formatDate(checkOutDate)}
            placeholder="Check out date"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={calendarIcon}
                    alt="Calendar"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
                    onClick={() => handleCalendarClick(checkOutRef)}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#F2F2F2",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                height: "43px",
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "14px",
                color: "#4F4F4F",
                letterSpacing: "0.02em",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(79, 79, 79, 1)",
                opacity: 1,
              },
              width: { xs: "100%", sm: "170px" },
            }}
          />
          <input
            type="date"
            ref={checkOutRef}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            onChange={(e) => handleDateChange(e.target.value, setCheckOutDate)}
          />
        </Box>

        <TextField
          placeholder="Guests"
          variant="outlined"
          fullWidth
          value={guests}
          onChange={handleGuestsChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={userSquare}
                  alt="Guests"
                  style={{ width: 20, height: 20, cursor: "pointer" }}
                />
              </InputAdornment>
            ),
            type: "number",
            inputProps: { min: 1 },
          }}
          sx={{
            background: "#F2F2F2",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              height: "43px",
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: "15px",
              color: "#4F4F4F",
              letterSpacing: "0.02em",
              "& fieldset": { border: "none" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(79, 79, 79, 1)",
              opacity: 1,
            },
            width: { xs: "100%", sm: "210px" },
          }}
        />

        <Button
          onClick={handleSearch}
          sx={{
            width: { xs: "100%", sm: "148px" },
            height: "44px",
            backgroundColor: "#2F80ED",
            borderRadius: "6px",
            color: "#FFFFFF",
            fontFamily: "'SF Pro Display', sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            letterSpacing: "0.02em",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1F6AD4",
            },
          }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

const GradientNavbar = ({ scrollToFooter }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <GradientBackground>
        <Navbar scrollToFooter={scrollToFooter} />
        <Box
          sx={{
            position: "relative",
            width: {xs:"93.59%"},
            
          }}
        >
          <SearchBar />
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default GradientNavbar;