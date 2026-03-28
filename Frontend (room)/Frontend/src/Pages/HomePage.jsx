import React, { useRef } from "react";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import HeroBanner from "../Components/Home/HeroBanner";
import SearchBar from "../Components/SearchBar";
import Restrictions from "../Components/Restrictions"; // Note: Not provided
import DreamVacation from "../Components/Home/DreamVacation";
import NextTrip from "../Components/Home/NextTrip";
import PopularHotels from "../Components/Home/PopularHotels";
import MobileApp from "../Components/Home/MobileApp";
import Footer from "../Components/Footer";
import "../App.css";

const HomePage = () => {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <Navbar scrollToFooter={scrollToFooter} />
      <HeroBanner />
      <SearchBar />
      <Restrictions />
      <DreamVacation />
      <NextTrip />
      <PopularHotels />
      <MobileApp />
      <Box ref={footerRef}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
