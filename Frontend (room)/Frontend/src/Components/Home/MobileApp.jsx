import React from "react";
import { Box, Typography } from "@mui/material";
import Mobile from "../../assets/Mobile.png";

const MobileApp = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "93%", sm: "90%", md: "1317px" },
        maxWidth: "100%",
        margin: "0 auto",
        mt: { xs: 4, md: 8 },
        px: { xs: 2, md: -10 },
        ml: { xs: 0, md: 8.5 },
      }}
    >
      
      <Box
        component="a"
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "block",
          position: "relative",
          width: { xs: "100%", sm: "90%", md: "1349px" }, 
          height: "280px",
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 0%), url(${Mobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          mx: "auto",
          textDecoration: "none",
        }}
      />

      
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "750px" }, 
          mt: { xs: 2, md: 4 },
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: { xs: "24px", md: "28px" },
            lineHeight: "140%", 
            color: "#181818",
            mb: 1,
            mt:"60px"
          }}
        >
          Explore the world with My Dream place
        </Typography>

        <Typography
          sx={{
            fontFamily: "'SF Pro Display', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: "140%", 
            letterSpacing: "0.02em",
            color: "#2F80ED",
            mb:"30px",
            mt:"20px"
          }}
        >
          Discover new places and experiences
        </Typography>
      </Box>
    </Box>
  );
};

export default MobileApp;
