import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import axios from "axios";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Activities = () => {
  const [bookedProperties, setBookedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user") || sessionStorage.getItem("user") || "{}"
        );
        const username = user?.Email ? user.Email.split("@")[0] : "guest";
        const response = await axios.get(
          "http://localhost:3002/api/getbookings",
          {
            params: { username },
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("token") || sessionStorage.getItem("token")
              }`,
            },
          }
        );
        setBookedProperties(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography component="div">Loading bookings...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography component="div" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        sx={{
          padding: { xs: "100px 30px", md: "100px 300px" },
          background: "rgba(242, 242, 242, 1)",
          minHeight: "50vh",
        }}
      >
        <motion.div variants={cardVariants}>
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: 700,
              marginBottom: "30px",
              color: "#1A1A1A",
            }}
          >
            My trips
          </Typography>
        </motion.div>

        {bookedProperties.length === 0 ? (
          <motion.div variants={cardVariants}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#4F4F4F",
                textAlign: "center",
              }}
            >
              No trips booked yet.
            </Typography>
          </motion.div>
        ) : (
          bookedProperties.map((property, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Box
                sx={{
                  display: { md: "flex", xs: "block" },
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  marginBottom: "30px",
                  maxWidth: "1100px",
                }}
              >
                <Box
                  sx={{
                    width: { xs:"405px",md: "320px" },
                    height: "240px",
                    backgroundImage: `url(${property.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mt: "11px",
                    ml: "10px",
                  }}
                />

                <Box sx={{ padding: "20px", flex: 1 ,ml:{xs:"0px"}}}>
                  <Typography variant="h6" fontWeight="600" fontSize="20px">
                    {property.propertyName}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "#4F4F4F", mt: 0.5 }}
                  >
                    Booked by: {property.username}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "#4F4F4F", mt: 0.5 }}
                  >
                    Phone: {property.phone}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    mt={1}
                  >
                    {Array.from({ length: Math.floor(property.rating) }).map(
                      (_, i) => (
                        <StarIcon
                          key={i}
                          sx={{ fontSize: "20px", color: "#FFA000" }}
                        />
                      )
                    )}
                    {property.rating % 1 !== 0 && (
                      <StarHalfIcon
                        sx={{ fontSize: "20px", color: "#FFA000" }}
                      />
                    )}
                    <Typography
                      sx={{
                        color: "#4F4F4F",
                        marginLeft: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {property.rating} ({property.reviews} Reviews)
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{ color: "#EB5757", mt: 2, fontSize: "14px" }}
                  >
                    Non refundable
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", mt: 0.5, color: "#4F4F4F" }}
                  >
                    Check in: {property.checkIn}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", mt: 0.5, color: "#4F4F4F" }}
                  >
                    Check out: {property.checkOut}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", mt: 0.5, color: "#4F4F4F" }}
                  >
                    {property.nights} night stay
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "220px",
                    padding: "20px",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "14px", color: "#333", mb: 1 }}>
                      1 room {property.nights} days
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="baseline"
                      gap={1}
                    >
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "#EB5757",
                          fontSize: "14px",
                        }}
                      >
                        ${property.originalPrice}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        ${property.price}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2F80ED",
                      color: "#fff",
                      textTransform: "none",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontWeight: 500,
                      fontSize: "15px",
                      borderRadius: "6px",
                      "&:hover": { backgroundColor: "#2366BF" },
                    }}
                  >
                    View trip Details
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ))
        )}
      </Box>
    </motion.div>
  );
};

export default Activities;
