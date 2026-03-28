import React from "react";
import OverView from "../Components/PropertyDetails/OverView";
import Navbar from "../Components/Navbar";
import Restrictions from "../Components/Restrictions";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";

const ProductDetails = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        bgcolor: "rgba(242, 242, 242, 1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Navbar />
      </Box>

      <Box
        sx={{
          width: "100%",
           // Match OverView.jsx maxWidth for consistency
          mx: "auto",
          px: { xs: 2, md: 0 }, // Responsive padding
        }}
      >
        <OverView />
      </Box>

      <Box
        sx={{
          mb: "220px", // Maintain bottom margin for spacing
          mt: "20px", // Adjusted from -80px to positive spacing to avoid overlap
          width: "100%",
          maxWidth: "1390px", // Consistent with OverView
          mx: "auto",
          px: { xs: 2, md: 0 }, // Responsive padding, fixed invalid -100
        }}
      >
        <Restrictions />
      </Box>

      <Box sx={{ width: "100%", bgcolor: "#FFFFFF" }}>
        {" "}
        {/* Added default bgcolor */}
        <Footer />
      </Box>
    </Box>
  );
};

export default ProductDetails;
