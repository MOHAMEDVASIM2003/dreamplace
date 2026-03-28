import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import GradientNavbar from "../Components/SearchingPage/GradientNavbar";
import Properties from "../Components/SearchingPage/Properties";
import Restrictions from "../Components/Restrictions";
import Footer from "../Components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Animation variants for the main container
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for child components
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SearchResults = () => {
  const [propertiesData, setPropertiesData] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const { country, checkInDate, checkOutDate, guests } = location.state || {};

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3002/api/getproperties"
        );
        let filtered = response.data;

        // Apply initial filters from SearchBar
        if (country) {
          filtered = filtered.filter(
            (property) =>
              property.country &&
              property.country.toLowerCase() === country.toLowerCase()
          );
        }

        if (guests && !isNaN(guests)) {
          filtered = filtered.filter(
            (property) => property.maxGuests && property.maxGuests >= guests
          );
        }

        // Note: Date filtering requires API support for availability
        if (checkInDate && checkOutDate) {
          console.warn(
            "Date filtering not implemented: API must provide availability data."
          );
        }

        setPropertiesData(filtered);
        setFilteredProperties(filtered);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [country, checkInDate, checkOutDate, guests]);

  const handleFilterChange = (newFilters) => {
    let filtered = [...propertiesData];

    // Filter by search query (property name)
    if (newFilters.propertyName) {
      filtered = filtered.filter((property) =>
        property.name
          .toLowerCase()
          .includes(newFilters.propertyName.toLowerCase())
      );
    }

    // Filter by budget
    if (newFilters.budget.length > 0) {
      filtered = filtered.filter((property) => {
        const price = property.currentPrice;
        return newFilters.budget.some((min) => {
          if (min === 0) return price >= 0 && price <= 200;
          if (min === 200) return price > 200 && price <= 500;
          if (min === 500) return price > 500 && price <= 1000;
          if (min === 1000) return price > 1000 && price <= 2000;
          if (min === 2000) return price > 2000 && price <= 5000;
          return false;
        });
      });
    }

    // Filter by rating
    if (newFilters.rating > 0) {
      filtered = filtered.filter(
        (property) => property.rating >= newFilters.rating
      );
    }

    // Filter by popular filters
    if (newFilters.popularFilters.length > 0) {
      filtered = filtered.filter((property) =>
        newFilters.popularFilters.every((filter) =>
          property.features?.includes(filter)
        )
      );
    }

    // Filter by activities
    if (newFilters.activities.length > 0) {
      filtered = filtered.filter((property) =>
        newFilters.activities.every((activity) =>
          property.activities?.includes(activity)
        )
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
          fontFamily: "SF Pro Display",
        }}
      >
        <GradientNavbar />
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            mt: 0,
            mb: "0px",
            px: { xs: 2, md: 5 },
          }}
        >
          <motion.div variants={childVariants}>
            <Properties
              properties={filteredProperties}
              loading={loading}
              error={error}
              country={country}
              onFilterChange={handleFilterChange}
            />
          </motion.div>
        </Box>
        <Box sx={{ mt: "10px" }}>
          <Box sx={{ mb: "200px", mt: "-40px" }}>
            <motion.div variants={childVariants}>
              <Restrictions />
            </motion.div>
          </Box>
          <Footer />
        </Box>
      </Box>
    </motion.div>
  );
};

export default SearchResults;
