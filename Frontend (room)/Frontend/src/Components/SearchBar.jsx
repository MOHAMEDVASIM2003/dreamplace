import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Stack,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import locationIcon from "../assets/locationIcon.png";
import calendar from "../assets/calendar-1.png";
import userSquare from "../assets/user-square-1.png";

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
    if (country) setSelectedCountry(country);
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
        position: { xs: "static", sm: "absolute" },
        width: { xs: "93%", sm: "90%", md: "min(1030px, 95vw)" },
        maxWidth: "100%",
        left: {  sm: "50%" },
        transform: { sm: "translateX(-50%)" },
        top: { sm: "calc(50vh + 68px)", md: "550px" },
        background: "rgba(255, 255, 255, 1)",
        boxShadow: { sm: "0px 4px 37px rgba(0, 0, 0, 0.15)" },
        borderRadius: { xs: 0, sm: 2 },
        p: { xs: 2, sm: 3, md: 1 },
        zIndex: 10,
        mt: { xs: 2, sm: 0 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          width: "100%",
          alignItems: { xs: "stretch", sm: "center" },
          flexWrap: "wrap",
        }}
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
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              height: { xs: 40, sm: 43 },
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: { xs: 12, sm: 14 },
              color: "#4F4F4F",
              letterSpacing: "0.02em",
              "& fieldset": { border: "none" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(79, 79, 79, 1)",
              opacity: 1,
            },
            flex: { sm: 1 },
            maxWidth: { sm: "260px" },
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleLocationClose(null)}
          PaperProps={{ style: { maxHeight: 200, width: "min(200px, 80vw)" } }}
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
        <Box
          sx={{
            position: "relative",
            flex: { sm: 1 },
            maxWidth: { sm: "170px" },
          }}
        >
          <TextField
            value={formatDate(checkInDate)}
            placeholder="Check in date"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={calendar}
                    alt="Calendar"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
                    onClick={() => handleCalendarClick(checkInRef)}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#F2F2F2",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                height: { xs: 40, sm: 43 },
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: { xs: 12, sm: 14 },
                color: "#4F4F4F",
                letterSpacing: "0.02em",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(79, 79, 79, 1)",
                opacity: 1,
              },
            }}
          />
          <input
            type="date"
            ref={checkInRef}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            onChange={(e) => handleDateChange(e.target.value, setCheckInDate)}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            flex: { sm: 1 },
            maxWidth: { sm: "170px" },
          }}
        >
          <TextField
            value={formatDate(checkOutDate)}
            placeholder="Check out date"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={calendar}
                    alt="Calendar"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
                    onClick={() => handleCalendarClick(checkOutRef)}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#F2F2F2",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                height: { xs: 40, sm: 43 },
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: { xs: 12, sm: 14 },
                color: "#4F4F4F",
                letterSpacing: "0.02em",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(79, 79, 79, 1)",
                opacity: 1,
              },
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
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              height: { xs: 40, sm: 43 },
              fontFamily: "'SF Pro Display', sans-serif",
              fontSize: { xs: 12, sm: 14 },
              color: "#4F4F4F",
              letterSpacing: "0.02em",
              "& fieldset": { border: "none" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(79, 79, 79, 1)",
              opacity: 1,
            },
            flex: { sm: 1 },
            maxWidth: { sm: "210px" },
          }}
        />
        <Button
          onClick={handleSearch}
          sx={{
            flex: { sm: 1 },
            maxWidth: { sm: "148px" },
            height: { xs: 40, sm: 44 },
            backgroundColor: "#2F80ED",
            borderRadius: 1,
            color: "#FFFFFF",
            fontFamily: "'SF Pro Display', sans-serif",
            fontWeight: 500,
            fontSize: { xs: 12, sm: 15 },
            letterSpacing: "0.02em",
            textTransform: "none",
            "&:hover": { backgroundColor: "#1F6AD4" },
          }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchBar;
