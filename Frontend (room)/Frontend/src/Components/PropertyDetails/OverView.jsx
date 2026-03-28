import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  Rating,
  Button,
  Container,
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link, Element } from "react-scroll";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Frame from "../../assets/Frame.png";
import calendar from "../../assets/calendar-1.png";
import userSquare from "../../assets/user-square-1.png";
import locationIcon from "../../assets/locationIcon.png";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PetsIcon from "@mui/icons-material/Pets";
import YardIcon from "@mui/icons-material/Yard";
import TourIcon from "@mui/icons-material/Tour";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KingBedIcon from "@mui/icons-material/KingBed";
import ShowerIcon from "@mui/icons-material/Shower";
import heroImage from "../../assets/Overview1.png";
import roomImage1 from "../../assets/Overview3.png";
import roomImage2 from "../../assets/Overview1.png";
import dow9 from "../../assets/dow9.jpg";

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// NavItem Component
const NavItem = ({ children, to, active = false }) => (
  <Link
    to={to}
    smooth={true}
    duration={500}
    offset={-50}
    style={{ textDecoration: "none" }}
  >
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: "pointer",
        padding: "10px 10px",
        gap: "1px",
        width:
          children === "Overview"
            ? "94px"
            : children === "Rooms"
            ? "77px"
            : "132px",
        height: "42px",
        flex: "none",
        order: children === "Overview" ? 0 : children === "Rooms" ? 1 : 2,
        flexGrow: 0,
        color: active ? "#333333" : "#828282",
        "&:hover": { color: "#2F80ED" },
        fontFamily: "'SF Pro Display', sans-serif",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "19px",
        letterSpacing: "0.02em",
      }}
    >
      <Typography>{children}</Typography>
      {active && (
        <Box
          sx={{
            width:
              children === "Overview"
                ? "94px"
                : children === "Rooms"
                ? "77px"
                : "132px",
            height: "3px",
            background: "#2F80ED",
            alignSelf: "stretch",
            flex: "none",
            order: 1,
            flexGrow: 0,
          }}
        />
      )}
    </Stack>
  </Link>
);

// FacilityItem Component
const FacilityItem = ({ icon, text }) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ my: 0.5 }}>
    {icon}
    <Typography
      sx={{
        fontFamily: "'SF Pro Display', sans-serif",
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "140%",
        letterSpacing: "0.02em",
        color: "#4F4F4F",
      }}
    >
      {text}
    </Typography>
  </Stack>
);

// ExploreItem Component
const ExploreItem = ({ name, distance }) => (
  <Stack direction="row" justifyContent="space-between" sx={{ my: 0.5 }}>
    <Typography
      sx={{
        fontFamily: "'SF Pro Display', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "0.02em",
        color: "#4F4F4F",
      }}
    >
      {name}
    </Typography>
    <Typography
      sx={{
        fontFamily: "'SF Pro Display', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "0.02em",
        color: "#4F4F4F",
        textAlign: "right",
      }}
    >
      {distance}
    </Typography>
  </Stack>
);

// GuestReviewItem Component
const GuestReviewItem = ({ reviewerName, rating, comment, date }) => (
  <Box sx={{ mb: 2 }}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        sx={{
          fontFamily: "'SF Pro Display', sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "19px",
          letterSpacing: "0.01em",
          color: "#1A1A1A",
        }}
      >
        {reviewerName}
      </Typography>
      <Rating value={rating} readOnly precision={0.5} size="small" />
    </Stack>
    <Typography
      sx={{
        fontFamily: "'SF Pro Display', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "140%",
        letterSpacing: "0.02em",
        color: "#4F4F4F",
        mt: 0.5,
      }}
    >
      {comment}
    </Typography>
    <Typography
      sx={{
        fontFamily: "'SF Pro Display', sans-serif",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "140%",
        letterSpacing: "0.02em",
        color: "#828282",
        mt: 0.5,
      }}
    >
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </Typography>
  </Box>
);

const OverView = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { MDPID } = location.state || {};

  const [checkInDate, setCheckInDate] = useState("2025-06-28");
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const today = new Date("2025-06-28");
    today.setDate(today.getDate() + 2);
    return today.toISOString().split("T")[0];
  });
  const [guests, setGuests] = useState("2");
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [errorCountries, setErrorCountries] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Fetch countries
  useEffect(() => {
    setLoadingCountries(true);
    const mockCountries = [
      "United States",
      "Canada",
      "United Kingdom",
      "Australia",
      "France",
    ];
    setCountries(mockCountries);
    setLoadingCountries(false);
  }, []);

  // Fetch property and geocode address
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3002/api/getproperties"
        );
        const selectedProperty = response.data.find(
          (prop) => prop.MDPID === MDPID
        );
        if (selectedProperty) {
          setProperty(selectedProperty);
          setSelectedCountry(
            selectedProperty.address.split(",")[1]?.trim() || ""
          );

          // Geocode the address using Nominatim
          const address = selectedProperty.address || "Green Pastures, Farmville";
          try {
            const geoResponse = await axios.get(
              `https://nominatim.openstreetmap.org/search`,
              {
                params: {
                  q: address,
                  format: "json",
                  limit: 1,
                },
              }
            );
            if (geoResponse.data.length > 0) {
              const { lat, lon } = geoResponse.data[0];
              setCoordinates([parseFloat(lat), parseFloat(lon)]);
            } else {
              setCoordinates([51.505, -0.09]); // Fallback coordinates (London)
            }
          } catch (geoError) {
            console.error("Error geocoding address:", geoError);
            setCoordinates([51.505, -0.09]); // Fallback coordinates
          }
        } else {
          setError("Property not found.");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };
    if (MDPID) {
      fetchProperty();
    } else {
      setError("No property ID provided.");
      setLoading(false);
    }
  }, [MDPID]);

  const handleLocationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocationClose = (country) => {
    if (country) {
      setSelectedCountry(country);
    }
    setAnchorEl(null);
  };

  const formatDate = (date) => {
    if (!date) return "Select date";
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleCalendarClick = (ref) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.showPicker();
    }
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

  const handleCheckAvailability = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/getproperties"
      );
      const selectedProperty = response.data.find(
        (prop) => prop.MDPID === MDPID
      );
      if (
        selectedProperty &&
        selectedProperty.rooms &&
        selectedProperty.rooms.length > 0
      ) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (err) {
      console.error("Error checking availability:", err);
      setIsAvailable(false);
    }
  };

  const handleReserveSuite = (room) => {
    navigate("/payment", {
      state: {
        property,
        checkInDate,
        checkOutDate,
        guests,
        selectedRoom: room,
      },
    });
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>Loading property details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!property) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No property data available.</Typography>
      </Box>
    );
  }

  const facilities = property.topFacilities || [
    "Free wifi",
    "Parking available",
    "BBQ Facilities",
    "Pet Friendly",
    "Garden Access",
    "Farm Tours",
  ];
  const exploreAreas = property.exploreArea || [
    { place: "Farm Animals", distance: "0.1 km" },
    { place: "Orchard", distance: "0.5 km" },
    { place: "Local Winery", distance: "7 km" },
    { place: "Scenic Drive", distance: "2 km" },
  ];
  const guestReviews = property.guestReviews || [
    {
      reviewerName: "Emma Wilson",
      rating: 4.5,
      comment:
        "Great stay with beautiful lake views. The staff was very friendly!",
      date: "2025-06-20",
    },
    {
      reviewerName: "Liam Taylor",
      rating: 4.7,
      comment: "Amazing experience, clean rooms, and excellent amenities.",
      date: "2025-06-25",
    },
  ];
  const rooms = property.rooms || [
    {
      title: "Family Farmhouse Room",
      size: "45 sq m",
      sleeps: "4",
      beds: "1 Double, 2 Single",
      image: roomImage1,
      promoCode: "FARMESCAPE",
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{ position: "relative", overflow: "hidden" }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "absolute",
          top: "68px",
          left: 0,
          right: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000000000px",
            height: "545px",
            background:
              "linear-gradient(180deg, rgba(0, 123, 255, 0) 0%, #FFFFFF 100%)",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1490px",
          height: "452px",
          marginTop: "92px",
          marginBottom: "20px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "955px",
            height: "452px",
            background: `url(${heroImage}) center/cover no-repeat`,
            borderRadius: "5px",
            zIndex: 10,
            position: "absolute",
            left: "72px",
          }}
        />
        <Stack
          spacing={2}
          sx={{
            width: "400px",
            height: "452px",
            position: "absolute",
            left: "1045px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "218px",
              background: `url(${roomImage1}) center/cover no-repeat`,
              borderRadius: "5px",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "218px",
              background: `url(${roomImage2}) center/cover no-repeat`,
              borderRadius: "5px",
              zIndex: 10,
            }}
          />
        </Stack>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1390px",
          height: "48px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 1px 0px #E0E0E0",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          mx: "auto",
          mt: "21px",
          px: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "331px",
            height: "42px",
            pl: 2,
            zIndex: 2,
          }}
        >
          <NavItem to="overview" active>
            Overview
          </NavItem>
          <NavItem to="rooms">Rooms</NavItem>
          <NavItem to="guest-reviews">Guest Reviews</NavItem>
        </Stack>
      </Paper>

      <Element name="overview">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1390px",
            mt: "40px",
            mx: "auto",
          }}
        >
          <Box sx={{ width: "810px" }}>
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontWeight: 600,
                fontSize: "32px",
                lineHeight: "38px",
                letterSpacing: "0.01em",
                color: "#1A1A1A",
                marginBottom: "10px",
              }}
            >
              {property.name || "Cozy Farm Stay"}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ marginBottom: "10px" }}
            >
              <Rating
                name="read-only"
                value={property.rating || 4.6}
                readOnly
                precision={0.5}
                size="small"
              />
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#4F4F4F",
                }}
              >
                {property.rating || 4.6} ({property.reviews || 85} Reviews)
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={1}
              sx={{ marginBottom: "20px" }}
            >
              <LocationOnIcon
                sx={{ color: "#828282", fontSize: "20px", mt: 0.2 }}
              />
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#333333",
                  width: "370px",
                }}
              >
                {property.address || "Green Pastures, Farmville"}
              </Typography>
            </Stack>

            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 1)",
                padding: "30px",
                borderRadius: "6px",
                width: "860px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "21px",
                  letterSpacing: "0.01em",
                  color: "#181818",
                  marginBottom: "10px",
                }}
              >
                Overview
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  mt: 1,
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "140%",
                  letterSpacing: "0.02em",
                  color: "#4F4F4F",
                }}
              >
                {property.longDescription ||
                  "Connect with nature and farm life at our cozy farm stay. Enjoy fresh produce, meet friendly farm animals, and explore the surrounding countryside. An ideal choice for a relaxing family vacation."}
              </Typography>
              <Divider
                sx={{ width: "100%", borderColor: "#E0E0E0", mt: 4, mb: 2 }}
              />
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "21px",
                  letterSpacing: "0.01em",
                  color: "#181818",
                  marginBottom: "10px",
                }}
              >
                Top facilities
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                spacing={6}
                sx={{ mt: 2, width: "100%" }}
              >
                <Box>
                  {facilities.slice(0, 3).map((facility, index) => (
                    <FacilityItem
                      key={index}
                      icon={
                        facility === "Free wifi" ? (
                          <WifiIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                        ) : facility === "Parking available" ? (
                          <LocalParkingIcon
                            sx={{ color: "#2F80ED", fontSize: 22 }}
                          />
                        ) : facility === "BBQ Facilities" ? (
                          <OutdoorGrillIcon
                            sx={{ color: "#2F80ED", fontSize: 22 }}
                          />
                        ) : (
                          <YardIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                        )
                      }
                      text={facility}
                    />
                  ))}
                </Box>
                <Box>
                  {facilities.slice(3).map((facility, index) => (
                    <FacilityItem
                      key={index}
                      icon={
                        facility === "Pet Friendly" ? (
                          <PetsIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                        ) : facility === "Garden Access" ? (
                          <YardIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                        ) : facility === "Farm Tours" ? (
                          <TourIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                        ) : (
                          <YardIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                        )
                      }
                      text={facility}
                    />
                  ))}
                </Box>
              </Stack>
              <Element name="guest-reviews">
                <Divider
                  sx={{ width: "100%", borderColor: "#E0E0E0", mt: 4, mb: 2 }}
                />
                <Typography
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "21px",
                    letterSpacing: "0.01em",
                    color: "#181818",
                    marginBottom: "10px",
                  }}
                >
                  Guest Reviews
                </Typography>
                <Box sx={{ mt: 2, width: "100%" }}>
                  {guestReviews.length > 0 ? (
                    guestReviews.map((review, index) => (
                      <GuestReviewItem
                        key={index}
                        reviewerName={review.reviewerName}
                        rating={review.rating}
                        comment={review.comment}
                        date={review.date}
                      />
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "140%",
                        letterSpacing: "0.02em",
                        color: "#4F4F4F",
                      }}
                    >
                      No reviews available.
                    </Typography>
                  )}
                </Box>
              </Element>
            </Box>
          </Box>

          <Box sx={{ width: "400px", position: "absolute", left: "1045px" }}>
            {coordinates ? (
              <MapContainer
                center={coordinates}
                zoom={13}
                style={{ height: "240px", width: "100%", borderRadius: "6px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordinates}>
                  <Popup>{property.name || "Cozy Farm Stay"}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "240px",
                  background: "#f0f0f0",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>Loading map...</Typography>
              </Box>
            )}
            <Typography
              sx={{
                mt: 2,
                fontFamily: "'SF Pro Display', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "21px",
                letterSpacing: "0.01em",
                color: "#181818",
                marginBottom: "10px",
              }}
            >
              Explore the area
            </Typography>
            <Stack sx={{ mt: 2 }}>
              {exploreAreas.map((area, index) => (
                <ExploreItem
                  key={index}
                  name={area.place || area.name}
                  distance={area.distance}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Element>

      <Element name="rooms">
        <Typography
          sx={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "29px",
            color: "#181818",
            marginTop: "50px",
            marginBottom: "30px",
            ml: "45px",
          }}
        >
          Available rooms
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1360px",
            height: "60px",
            background: "#F2F2F2",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            bgcolor: "rgba(255, 255, 255, 1)",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            mx: "auto",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <TextField
              placeholder={selectedCountry || "Where are you going?"}
              variant="outlined"
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
                width: "260px",
              }}
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
              onClick={handleLocationClick}
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
              ) : errorCountries ? (
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

            <Box sx={{ position: "relative", width: "260px" }}>
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
                  width: "260px",
                }}
              />
              <input
                type="date"
                ref={checkInRef}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
                onChange={(e) =>
                  handleDateChange(e.target.value, setCheckInDate)
                }
              />
            </Box>

            <Box sx={{ position: "relative", width: "260px" }}>
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
                  width: "260px",
                }}
              />
              <input
                type="date"
                ref={checkOutRef}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
                onChange={(e) =>
                  handleDateChange(e.target.value, setCheckOutDate)
                }
              />
            </Box>

            <TextField
              placeholder="Guests"
              variant="outlined"
              value={
                guests
                  ? `${guests} adult${guests > 1 ? "s" : ""}, 1 room`
                  : "2 adults, 1 room"
              }
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
                width: "260px",
              }}
            />

            <Button
              onClick={handleCheckAvailability}
              sx={{
                width: "260px",
                height: "44px",
                backgroundColor: isAvailable ? "#4CAF50" : "#2F80ED",
                borderRadius: "6px",
                color: "#FFFFFF",
                fontFamily: "'SF Pro Display', sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                letterSpacing: "0.02em",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: isAvailable ? "#45A049" : "#1F6AD4",
                },
              }}
            >
              {isAvailable ? "Available" : "Check Availability"}
            </Button>
          </Stack>
        </Box>
      </Element>

      <Box
        sx={{
          display: "flex",
          gap: 6,
          width: "100%",
          maxWidth: "1390px",
          marginBottom: "20px",
          mx: "auto",
          mt: "60px",
        }}
      >
        <Box
          sx={{
            width: "430px",
            height: "340px",
            background: "linear-gradient(180deg, #4796FF 0%, #2366BF 100%)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <Stack
            spacing={1}
            sx={{ position: "relative", left: "30px", top: "72px" }}
          >
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "21px",
                letterSpacing: "0.02em",
                color: "#FFFFFF",
              }}
            >
              My Dream Place
            </Typography>
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "29px",
                color: "#FFFFFF",
              }}
            >
              10% off <br /> Use Promotional <br /> Coupon Code: <br />
              <Box sx={{ color: "rgba(255, 215, 35, 1)", mt: "10px" }}>
                {rooms[0]?.promoCode || "FARMESCAPE"}
              </Box>
            </Typography>
          </Stack>
          <Box
            component="img"
            src={Frame}
            alt="Promotional offer"
            sx={{
              position: "absolute",
              top: "1530px",
              left: "260px",
              width: "177px",
              height: "291px",
              mt: "60px",
            }}
          />
        </Box>

        {rooms.map((room, index) => (
          <Paper
            key={index}
            sx={{
              width: "430px",
              height: "432px",
              background: "#FFFFFF",
              borderRadius: "6px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "200px",
                background: `url(${dow9}) center/cover no-repeat`,
                borderRadius: "6px 6px 0px 0px",
              }}
            />
            <Box sx={{ p: 2 }}>
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "21px",
                  letterSpacing: "0.01em",
                  color: "#1A1A1A",
                  mb: 1,
                  display: "flex",
                }}
              >
                {room.title || room.name}
              </Typography>
              <Stack direction="column" spacing={0.5} alignItems="left">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <KingBedIcon sx={{ fontSize: 18, color: "#828282" }} />
                  <Typography sx={{ fontSize: 14, color: "#4F4F4F" }}>
                    {room.size}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <KingBedIcon sx={{ fontSize: 18, color: "#828282" }} />
                  <Typography sx={{ fontSize: 14, color: "#4F4F4F" }}>
                    Sleeps {room.sleeps}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{ mt: 0.5 }}
              >
                <ShowerIcon sx={{ fontSize: 18, color: "#828282" }} />
                <Typography sx={{ fontSize: 14, color: "#4F4F4F" }}>
                  {room.beds}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleReserveSuite(room)}
                sx={{
                  mt: 6,
                  background: "#2F80ED",
                  borderRadius: "4px",
                  textTransform: "none",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#FFFFFF",
                  "&:hover": {
                    background: "#2366BF",
                  },
                }}
              >
                Reserve suite
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default OverView;