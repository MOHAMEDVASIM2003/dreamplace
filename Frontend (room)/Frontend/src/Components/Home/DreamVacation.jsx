import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Aus from "../../assets/Aus.png";
import Jap from "../../assets/Jap.png";
import New from "../../assets/New.png";
import Gre from "../../assets/Gre.png";


const countryImages = {
  Australia: Aus,
  Japan: Jap,
  "New Zealand": New,
  Greece: Gre,
  Italy: New, 
};


const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: idx * 0.2, 
      ease: "easeOut",
    },
  }),
};

const DreamVacation = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3002/api/getproperties"
        );
        const properties = response.data;

       
        const countryMap = properties.reduce((acc, property) => {
          const country = property.country;
          if (country) {
            acc[country] = (acc[country] || 0) + 1;
          }
          return acc;
        }, {});

       
        const fetchedDestinations = Object.keys(countryMap)
          .filter((country) => countryImages[country]) 
          .slice(0, 5) 
          .map((country) => ({
            name: country,
            properties: `${countryMap[country]} properties`,
            image: countryImages[country],
          }));

        setDestinations(fetchedDestinations);
      } catch (err) {
        setError("Failed to fetch destinations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  
  const handleCardClick = (country) => {
    navigate("/search-results", {
      state: { country },
    });
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>Loading destinations...</Typography>
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
        position: "relative",
        width: { xs: "90%", sm: "100%", md: "100%" },
        maxWidth: "1440px",
        margin: "0 auto",
        pt: { xs: 5, md: 8 },
        px: { xs: 2, md: 10.25 },
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
      >
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 600,
            fontSize: { xs: "24px", md: "28px" },
            lineHeight: "33px",
            color: "#181818",
            mb: 1,
          }}
        >
          Enjoy your dream vacation
        </Typography>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
      >
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "22px",
            letterSpacing: "0.02em",
            color: "#333333",
            mb: 4,
            maxWidth: "610px",
          }}
        >
          Plan and book our perfect trip with expert advice, travel tips,
          destination information and inspiration from us
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: { xs: "column", sm: "column", md: "flex" },
          flexWrap: "wrap",
          gap: { xs: 5, sm: 2.5, md: 2.5 },
        }}
      >
        {destinations.map((dest, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            onClick={() => handleCardClick(dest.name)}
            sx={{ cursor: "pointer" }}
          >
            <Box sx={{ width: { xs: "100%", sm: "48%", md: "322.5px" } }}>
              <Box
                sx={{
                  width: "100%",
                  height: "220px",
                  borderRadius: "8px",
                  backgroundImage: `url(${dest.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}
              />

              <Box
                sx={{
                  mt: 2,
                  mb:{xs: "2%", sm: "2%", md: "-10"},
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "SF Pro Display",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#181818",
                  }}
                >
                  {dest.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "SF Pro Display",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "17px",
                    letterSpacing: "0.02em",
                    color: "#181818",
                  }}
                >
                  {dest.properties}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default DreamVacation;
