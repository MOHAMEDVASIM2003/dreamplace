import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  Switch,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


import Pro1 from "../../assets/Pro1.png";
import Pro2 from "../../assets/Pro2.png";
import Pro3 from "../../assets/Pro3.png";
import Pro4 from "../../assets/Pro4.png";
import Pro5 from "../../assets/Pro5.png";
import Pro6 from "../../assets/Pro6.png";
import Pro7 from "../../assets/Pro7.png";
import Pro8 from "../../assets/Pro8.png";
import dow1 from "../../assets/dow1.jpg";
import dow2 from "../../assets/dow2.jpg";
import dow3 from "../../assets/dow3.jpg";
import dow4 from "../../assets/dow4.jpg";
import dow5 from "../../assets/dow5.jpg";
import dow6 from "../../assets/dow6.jpg";
import dow7 from "../../assets/dow7.jpg";
import dow8 from "../../assets/dow8.jpg";
import dow9 from "../../assets/dow9.jpg";
import dow10 from "../../assets/dow10.jpg";


const allPropertyImages = {
  MDP01: Pro1,
  MDP02: Pro2,
  MDP03: Pro3,
  MDP04: Pro4,
  MDP05: Pro5,
  MDP06: Pro6,
  MDP07: Pro7,
  MDP08: Pro8,
  MDP09: dow1,
  MDP10: dow2,
  MDP11: dow3,
  MDP12: dow4,
  MDP13: dow5,
  MDP14: dow6,
  MDP15: dow7,
  MDP16: dow8,
  MDP17: dow9,
  MDP18: dow2,
  MDP19: dow3,
  MDP20: dow9,
  MDP22: dow2,
  MDP23: dow3,
  MDP24: dow4,
  MDP25: dow5,
  MDP26: dow6,
  MDP27: dow7,
  MDP28: dow8,
  MDP29: dow9,
  MDP30: dow10,
  MDP31: dow3,
  MDP32: dow9,
  MDP39: Pro4,
};

// Styled components (unchanged)
const DiscountTag = styled(Box)(({ theme, bgcolor }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 8px",
  gap: "10px",
  position: "absolute",
  right: 20,
  top: 80,
  background: bgcolor,
  borderRadius: "6px",
  color: "#FFFFFF",
  fontFamily: "SF Pro Display",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "18px",
  letterSpacing: "0.02em",
}));

const BookingOfferTag = styled(Box)(({ theme, bgcolor }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 8px",
  gap: "10px",
  position: "absolute",
  right: 20,
  top: 50,
  background: bgcolor,
  borderRadius: "6px",
  color: "#FFFFFF",
  fontFamily: "SF Pro Display",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "18px",
  letterSpacing: "0.02em",
}));

const RatingButton = styled(ButtonBase)(({ theme }) => ({
  width: 55,
  height: 46,
  backgroundColor: "#FFFFFF",
  borderTop: "1px solid #E0E0E0",
  borderBottom: "1px solid #E0E0E0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:first-of-type": {
    borderLeft: "1px solid #E0E0E0",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  "&:last-of-type": {
    borderRight: "1px solid #E0E0E0",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
}));


const budgetOptions = [
  { label: "$ 0 - $ 200", min: 0, max: 200 },
  { label: "$ 200 - $ 500", min: 200, max: 500 },
  { label: "$ 500 - $ 1,000", min: 500, max: 1000 },
  { label: "$ 1,000 - $ 2,000", min: 1000, max: 2000 },
  { label: "$ 2,000 - $ 5,000", min: 2000, max: 5000},
];

const ratingOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const popularFilters = [
  { label: "Free cancellation", count: 200 },
  { label: "Spa", count: 100 },
  { label: "Beach front", count: 15 },
  { label: "Hot tub/jacuzzi", count: 12 },
  { label: "Book without credit card", count: 230 },
  { label: "No prepayment", count: 12 },
];

const activityOptions = [
  { label: "Fishing", count: 200 },
  { label: "Hiking", count: 100 },
  { label: "Beach", count: 15 },
  { label: "Cycling", count: 12 },
  { label: "Sauna", count: 230 },
  { label: "Night lights", count: 12 },
];


const PropertyCard = ({ property }) => {
  const {
    _id,
    MDPID,
    name = "Unknown Property",
    rating = 0,
    reviews = 0,
    shortDescription = "",
    longDescription = "",
    originalPrice,
    currentPrice = 0,
    roomDays = "",
    discount,
    bookingOffer,
    image: apiImageName,
  } = property;

  const image =
    allPropertyImages[MDPID] ||
    (apiImageName ? `/assets/${apiImageName}` : Pro1);
  const navigate = useNavigate();

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= numStars) {
        stars.push(
          <StarIcon key={i} sx={{ fontSize: 20, color: "#F2994A" }} />
        );
      } else if (i - 0.5 === numStars) {
        stars.push(
          <StarBorderIcon key={i} sx={{ fontSize: 20, color: "#F2994A" }} />
        );
      } else {
        stars.push(
          <StarBorderIcon key={i} sx={{ fontSize: 20, color: "#F2994A" }} />
        );
      }
    }
    return stars;
  };

  const handleSeeAvailability = () => {
    navigate(`/overview/${_id.$oid || _id}`, { state: { MDPID } });
  };

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "1010px",
        height: "240px",
        background: "#FFFFFF",
        border: "1px solid #E0E0E0",
        borderRadius: "5px",
        mb: 3,
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "285px",
          height: "200px",
          ml: "20px",
          my: "20px",
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "5px",
          flexShrink: 0,
        }}
      />
      <Box sx={{ p: 2.5, flexGrow: 1, position: "relative" }}>
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "24px",
            letterSpacing: "0.01em",
            color:" #1A1A1A",
            mb: 0.5,
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", mr: 1 }}>{renderStars(Math.floor(rating))}</Box>
          <Typography
            sx={{
              fontFamily: "SF Pro Display",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "140%",
              letterSpacing: "0.02em",
              color: "#4F4F4F",
            }}
          >
            {rating} ({reviews} Reviews)
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "140%",
            letterSpacing: "0.02em",
            color: "#4F4F4F",
            mb: 0.5,
          }}
        >
          {shortDescription}
        </Typography>
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "140%",
            letterSpacing: "0.02em",
            color: "#4F4F4F",
            mb: 2,
          }}
        >
          {longDescription}
        </Typography>
        <Button
          variant="contained"
          onClick={handleSeeAvailability}
          sx={{
            background: "#2F80ED",
            borderRadius: "6px",
            padding: "10px 18px",
            textTransform: "none",
            fontFamily: "SF Pro Display",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "20px",
            letterSpacing: "0.02em",
            color: "#FFFFFF",
            position: "absolute",
            bottom: 20,
            left: 20,
          }}
        >
          See availability
        </Button>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              fontFamily: "SF Pro Display",
              fontWeight: 300,
              fontSize: "14px",
              lineHeight: "17px",
              letterSpacing: "0.02em",
              color: "#333333",
              mb: 0.5,
            }}
          >
            {roomDays}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "8px",
              mb: 0.5,
            }}
          >
            {originalPrice && (
              <Typography
                sx={{
                  fontFamily: "SF Pro Display",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17px",
                  letterSpacing: "0.01em",
                  textDecorationLine: "line-through",
                  color: discount === "5% off" ? "#EB5757" : "#BDBDBD",
                }}
              >
                ${originalPrice}
              </Typography>
            )}
            <Typography
              sx={{
                fontFamily: "SF Pro Display",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0.01em",
                color: "#333333",
              }}
            >
              ${currentPrice}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "SF Pro Display",
              fontWeight: 300,
              fontSize: "14px",
              lineHeight: "17px",
              letterSpacing: "0.02em",
              color: "#333333",
            }}
          >
            Includes taxes and fees
          </Typography>
        </Box>
        {bookingOffer && (
          <BookingOfferTag bgcolor="#EB5757" mt={"-30px"}>
            {bookingOffer}
          </BookingOfferTag>
        )}
        {discount && (
          <DiscountTag bgcolor="#219653" mt={"-25px"}>
            {discount}
          </DiscountTag>
        )}
      </Box>
    </Box>
  );
};

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]); 
  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [selectedPopularFilters, setSelectedPopularFilters] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [propertyName, setPropertyName] = useState("");
  const [customBudget, setCustomBudget] = useState(false);
  const [customMinBudget, setCustomMinBudget] = useState("");
  const [customMaxBudget, setCustomMaxBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const propertiesPerPage = 8;

  const location = useLocation();
  const { country, checkInDate, checkOutDate, guests } = location.state || {};

  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3002/api/getproperties"
        );
        let fetchedProperties = response.data;

       
        if (country) {
          fetchedProperties = fetchedProperties.filter(
            (property) =>
              property.country?.toLowerCase() === country.toLowerCase()
          );
        }

        if (checkInDate && checkOutDate && guests) {
          fetchedProperties = fetchedProperties.filter((property) => {
            const rooms = property.rooms || [];
            return rooms.some((room) => {
              const { availabilityDates, guests: roomGuests } = room;
              const roomGuestCount = parseInt(roomGuests, 10);
              const checkIn = new Date(checkInDate);
              const checkOut = new Date(checkOutDate);
              const fromDate = new Date(availabilityDates?.from);
              const toDate = new Date(availabilityDates?.to);

              const isAvailable = checkIn >= fromDate && checkOut <= toDate;
              const canAccommodateGuests =
                roomGuestCount >= parseInt(guests, 10);

              return isAvailable && canAccommodateGuests;
            });
          });
        }

        setAllProperties(fetchedProperties);
        setProperties(fetchedProperties);
      } catch (err) {
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [country, checkInDate, checkOutDate, guests]);

 
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...allProperties];

     
      if (propertyName) {
        filtered = filtered.filter(
          (property) =>
            property?.name?.toLowerCase()?.includes(propertyName.toLowerCase()) ??
            false
        );
      }

     
      if (selectedBudget.length > 0 || (customBudget && customMinBudget && customMaxBudget)) {
        filtered = filtered.filter((property) => {
          const price = property?.currentPrice ?? 0;
          if (customBudget && customMinBudget && customMaxBudget) {
            const min = parseFloat(customMinBudget);
            const max = parseFloat(customMaxBudget);
            return price >= min && price <= max;
          }
          return selectedBudget.some(({ min, max }) => price >= min && price <= max);
        });
      }

      
      if (selectedRating > 0) {
        filtered = filtered.filter(
          (property) => (property?.rating ?? 0) >= selectedRating
        );
      }

      
      if (selectedPopularFilters.length > 0) {
        filtered = filtered.filter((property) =>
          selectedPopularFilters.every(
            (filter) => property?.topFacilities?.includes(filter) ?? false
          )
        );
      }

      
      if (selectedActivities.length > 0) {
        filtered = filtered.filter((property) =>
          selectedActivities.every(
            (activity) => property?.activities?.includes(activity) ?? false
          )
        );
      }

      
      if (filterType !== "all" && filterType !== "our top picks") {
        filtered = filtered.filter(
          (property) =>
            property?.propertyType?.toLowerCase() === filterType.toLowerCase()
        );
      }

      setProperties(filtered);
      setVisibleCount(propertiesPerPage);
    };

    applyFilters();
  }, [
    propertyName,
    selectedBudget,
    selectedRating,
    selectedPopularFilters,
    selectedActivities,
    filterType,
    customBudget,
    customMinBudget,
    customMaxBudget,
    allProperties,
  ]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + propertiesPerPage);
  };

  const handleRatingClick = (value) => {
    setSelectedRating(value === selectedRating ? 0 : value);
  };

  const handleBudgetChange = (option) => {
    setSelectedBudget((prev) => {
      const isSelected = prev.some((b) => b.min === option.min);
      if (isSelected) {
        return prev.filter((b) => b.min !== option.min);
      }
      return [...prev, { min: option.min, max: option.max }];
    });
  };

  const handlePopularFilterChange = (label) => {
    setSelectedPopularFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const handleActivityChange = (label) => {
    setSelectedActivities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleCustomBudgetToggle = () => {
    setCustomBudget((prev) => !prev);
    if (customBudget) {
      setCustomMinBudget("");
      setCustomMaxBudget("");
    }
  };

  const handleClearFilters = () => {
    setPropertyName("");
    setSelectedBudget([]);
    setSelectedRating(0);
    setSelectedPopularFilters([]);
    setSelectedActivities([]);
    setFilterType("all");
    setCustomBudget(false);
    setCustomMinBudget("");
    setCustomMaxBudget("");
  };

  
  const updatedBudgetOptions = budgetOptions.map((option) => ({
    ...option,
    count: allProperties.filter(
      (property) =>
        (property?.currentPrice ?? 0) >= option.min &&
        (property?.currentPrice ?? 0) <= option.max
    ).length,
  }));

  const updatedPopularFilters = popularFilters.map((option) => ({
    ...option,
    count: allProperties.filter(
      (property) => property?.topFacilities?.includes(option.label) ?? false
    ).length,
  }));

  const updatedActivityOptions = activityOptions.map((option) => ({
    ...option,
    count: allProperties.filter(
      (property) => property?.activities?.includes(option.label) ?? false
    ).length,
  }));

  const sortedProperties = useMemo(() => {
    return [...properties].sort((a, b) => {
      switch (sortOption) {
        case "price-low-to-high":
          return (a?.currentPrice ?? 0) - (b?.currentPrice ?? 0);
        case "price-high-to-low":
          return (b?.currentPrice ?? 0) - (a?.currentPrice ?? 0);
        case "rating-high-to-low":
          return (b?.rating ?? 0) - (a?.rating ?? 0);
        case "recommended":
        default:
          return 0;
      }
    });
  }, [properties, sortOption]);

  const visibleProperties = sortedProperties.slice(0, visibleCount);

  const cardHeight = 240;
  const cardMarginBottom = 24;
  const headerHeight = 32;
  const headerMarginBottom = 24;
  const filterBarHeight = 40;
  const filterBarMarginBottom = 32;
  const buttonHeight = 40;
  const buttonMarginTop = 40;
  const totalHeight =
    visibleProperties.length * (cardHeight + cardMarginBottom) +
    headerHeight +
    headerMarginBottom +
    filterBarHeight +
    filterBarMarginBottom +
    (visibleProperties.length < sortedProperties.length
      ? buttonHeight + buttonMarginTop
      : 0);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>Loading properties...</Typography>
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

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
        maxWidth: 1310,
        mx: "auto",
        mt: { xs:50,md: 304 / 16 },
        ml: "55px",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 304,
          fontFamily: "SF Pro Display",
          width: 295,
          mr: 3,
          mt: "-590px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 119,
            backgroundColor: "#F2F2F2",
            borderRadius: "6px",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              px: 2.25,
              pt: 2,
              fontSize: 16,
              fontWeight: 500,
              color: "#181818",
            }}
          >
            Search by property name
          </Typography>
          <Box
            sx={{
              mx: 2,
              mt: 2,
              px: 2,
              py: 1,
              borderRadius: "4px",
              border: "1px solid #E0E0E0",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SearchIcon sx={{ color: "#4F4F4F", width: 20, height: 20 }} />
            <TextField
              placeholder="eg. Beach westpalm"
              variant="standard"
              fullWidth
              value={propertyName}
              onChange={handlePropertyNameChange}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: 14, color: "#4F4F4F" },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "21px",
              letterSpacing: "0.02em",
              color: "#333333",
            }}
          >
            Filter by
          </Typography>
          <Button
            variant="text"
            onClick={handleClearFilters}
            sx={{
              textTransform: "none",
              fontFamily: "SF Pro Display",
              fontSize: 14,
              color: "#2F80ED",
            }}
          >
            Clear Filters
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            borderRadius: "6px",
            mb: 3,
            visibility:{xs:"revert"}
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F2F2F2",
              borderBottom: "1px solid #E0E0E0",
              px: 2.25,
              py: 2,
            }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, color: "#181818" }}
            >
              Your budget per day
            </Typography>
          </Box>
          {updatedBudgetOptions.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox
                  disableRipple
                  checked={selectedBudget.some((b) => b.min === item.min)}
                  onChange={() => handleBudgetChange(item)}
                  sx={{
                    width: 20,
                    height: 20,
                    p: 0,
                    borderRadius: "4px",
                    border: "1px solid #BDBDBD",
                    "&.Mui-checked": {
                      color: "#27AE60",
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                        visibility: "visible",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontSize: 14, color: "#333" }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, color: "#333" }}>
                {item.count}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: 14, color: "#4F4F4F" }}>
              Set your own budget
            </Typography>
            <Switch
              disableRipple
              checked={customBudget}
              onChange={handleCustomBudgetToggle}
              sx={{
                width: 36,
                height: 20,
                padding: 0,
                "& .MuiSwitch-switchBase": {
                  p: 0.5,
                  color: "#fff",
                  "&.Mui-checked": {
                    transform: "translateX(16px)",
                    color: "#fff",
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#27AE60",
                      opacity: 1,
                    },
                  },
                  "&.Mui-focusVisible .MuiSwitch-thumb": {
                    color: "#27AE60",
                    border: "6px solid #fff",
                  },
                },
                "& .MuiSwitch-thumb": {
                  width: 13,
                  height: 13,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                },
                "& .MuiSwitch-track": {
                  borderRadius: 20 / 2,
                  backgroundColor: "#BDBDBD",
                  opacity: 1,
                  transition:
                    "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </Box>
          {customBudget && (
            <Box sx={{ px: 2, py: 1, display: "flex", gap: 1 }}>
              <TextField
                label="Min Budget"
                type="number"
                value={customMinBudget}
                onChange={(e) => setCustomMinBudget(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Max Budget"
                type="number"
                value={customMaxBudget}
                onChange={(e) => setCustomMaxBudget(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            borderRadius: "6px",
            mb: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F2F2F2",
              borderBottom: "1px solid #E0E0E0",
              px: 2.25,
              py: 2,
            }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, color: "#181818" }}
            >
              Rating
            </Typography>
          </Box>
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: 14, color: "#4F4F4F" }}>
              Show only ratings more than
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mx: 2, mb: 2 }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <RatingButton
                key={rating}
                onClick={() => handleRatingClick(rating)}
              >
                <StarIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: selectedRating >= rating ? "#F2994A" : "#E0E0E0",
                  }}
                />
              </RatingButton>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mx: 2,
              mt: -1,
              pb: 2,
            }}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <Typography
                key={`num-${rating}`}
                sx={{
                  fontFamily: "SF Pro Display",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: "19px",
                  letterSpacing: "0.02em",
                  color: selectedRating === rating ? "#333333" : "#BDBDBD",
                  width: 50,
                  textAlign: "center",
                }}
              >
                {rating}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            borderRadius: "6px",
            mb: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F2F2F2",
              borderBottom: "1px solid #E0E0E0",
              px: 2.25,
              py: 2,
            }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, color: "#181818" }}
            >
              Popular Filters
            </Typography>
          </Box>
          {updatedPopularFilters.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox
                  disableRipple
                  checked={selectedPopularFilters.includes(item.label)}
                  onChange={() => handlePopularFilterChange(item.label)}
                  sx={{
                    width: 20,
                    height: 20,
                    p: 0,
                    borderRadius: "4px",
                    border: "1px solid #BDBDBD",
                    "&.Mui-checked": {
                      color: "#27AE60",
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                        visibility: "visible",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontSize: 14, color: "#333" }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, color: "#333" }}>
                {item.count}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            borderRadius: "6px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F2F2F2",
              borderBottom: "1px solid #E0E0E0",
              px: 2.25,
              py: 2,
            }}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, color: "#181818" }}
            >
              Activities
            </Typography>
          </Box>
          {updatedActivityOptions.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox
                  disableRipple
                  checked={selectedActivities.includes(item.label)}
                  onChange={() => handleActivityChange(item.label)}
                  sx={{
                    width: 20,
                    height: 20,
                    p: 0,
                    borderRadius: "4px",
                    border: "1px solid #BDBDBD",
                    "&.Mui-checked": {
                      color: "#27AE60",
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                        visibility: "visible",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                    },
                  }}
                />
                <Typography sx={{ fontSize: 14, color: "#333" }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, color: "#333" }}>
                {item.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: "SF Pro Display",
          width: "1010px",
          minHeight: `${totalHeight}px`,
          mt: "-590px",
        }}
      >
        <Typography
          sx={{
            width: "504px",
            height: "32px",
            fontFamily: "SF Pro Display",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "29px",
            color: "#181818",
            mb: 3,
          }}
        >
          {country || "All Properties"} : {sortedProperties.length} search
          results found
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            width: "1010px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: "0px",
              height: "40px",
            }}
          >
            {[
              { label: "Our top picks", type: "our top picks" },
              { label: "Hotel and apartments", type: "hotel and apartments" },
              { label: "Residence", type: "residence" },
              { label: "Resort", type: "resort" },
              { label: "Shared Space", type: "shared space" },
            ].map((filter, index) => (
              <Box
                key={filter.type}
                role="button"
                aria-label={`Filter by ${filter.label}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px 18px",
                  gap: "10px",
                  minWidth: "100px",
                  height: "20px",
                  background:
                    filterType === filter.type ? "#2F80ED" : "#FFFFFF",
                  border: "1px solid #2F80ED",
                  borderRadius:
                    index === 0
                      ? "6px 0px 0px 6px"
                      : index === 4
                      ? "0px 6px 6px 0px"
                      : "0px",
                  flex: "none",
                  order: index,
                  flexGrow: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleFilterChange(filter.type)}
              >
                <Typography
                  sx={{
                    width: "auto",
                    height: "20px",
                    fontFamily: "SF Pro Display",
                    fontWeight: filterType === filter.type ? 500 : 400,
                    fontSize: "15px",
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    color: filterType === filter.type ? "#FFFFFF" : "#4F4F4F",
                    flex: "none",
                    order: 0,
                    flexGrow: 0,
                  }}
                >
                  {filter.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            role="button"
            aria-label="Sort options"
            aria-expanded={isDropdownOpen}
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "8px 12px",
              width: "190px",
              height: "48px",
              background: "#FFFFFF",
              border: "1px solid #BDBDBD",
              borderRadius: "6px",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "2px",
                width: "150px",
                height: "32px",
                flex: "none",
                order: 0,
                flexGrow: 1,
              }}
            >
              <Typography
                sx={{
                  width: "39px",
                  height: "12px",
                  fontFamily: "SF Pro Display",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "0.02em",
                  color: "#828282",
                  flex: "none",
                  order: 0,
                  flexGrow: 0,
                }}
              >
                Sort by
              </Typography>
              <Typography
                sx={{
                  width: "auto",
                  height: "18px",
                  fontFamily: "SF Pro Display",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "18px",
                  letterSpacing: "0.02em",
                  color: "#333333",
                  flex: "none",
                  order: 1,
                  flexGrow: 0,
                }}
              >
                {sortOption === "recommended"
                  ? "Recommended"
                  : sortOption === "price-low-to-high"
                  ? "Price: Low to High"
                  : sortOption === "price-high-to-low"
                  ? "Price: High to Low"
                  : "Rating: High to Low"}
              </Typography>
            </Box>
            <ArrowDropDownIcon sx={{ color: "#333333" }} />
            <Box
              id="sort-dropdown"
              sx={{
                display: isDropdownOpen ? "block" : "none",
                position: "absolute",
                top: "48px",
                left: 0,
                width: "190px",
                background: "#FFFFFF",
                border: "1px solid #BDBDBD",
                borderRadius: "6px",
                zIndex: 10,
                flexDirection: "column",
              }}
            >
              {[
                { label: "Recommended", value: "recommended" },
                { label: "Price: Low to High", value: "price-low-to-high" },
                { label: "Price: High to Low", value: "price-high-to-low" },
                { label: "Rating: High to Low", value: "rating-high-to-low" },
              ].map((option) => (
                <Typography
                  key={option.value}
                  sx={{
                    padding: "10px 12px",
                    fontFamily: "SF Pro Display",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#333333",
                    cursor: "pointer",
                    "&:hover": { background: "#F5F5F5" },
                  }}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        {visibleProperties.map((property) => (
          <PropertyCard
            key={property._id.$oid || String(property._id)}
            property={property}
          />
        ))}
        {visibleProperties.length < sortedProperties.length && (
          <Button
            variant="contained"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 18px",
              gap: "10px",
              ml: "450px",
              mt: "40px",
              width: "156px",
              height: "40px",
              background: "rgba(47, 128, 237, 0.1)",
              borderRadius: "6px",
              fontFamily: "'SF Pro Display', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "20px",
              letterSpacing: "0.02em",
              color: "#2F80ED",
              textTransform: "none",
              flex: "none",
              order: 0,
              flexGrow: 0,
            }}
            onClick={handleLoadMore}
            aria-label="Load more results"
          >
            Load more results
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Properties;