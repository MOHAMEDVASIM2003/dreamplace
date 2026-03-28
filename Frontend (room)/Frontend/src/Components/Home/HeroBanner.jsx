import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Hero from "../../assets/Hero.png";
import Hero1 from "../../assets/Hero1.jpg";
import hero2 from "../../assets/hero5.jpg";
import hero3 from "../../assets/hero3.jpg";
import hero4 from "../../assets/hero6.jpg";

import "@qpokychuk/sf-pro-display";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const heroImages = [Hero, Hero1, hero2, hero3, hero4];

const HeroBanner = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    cssEase: "ease-in-out",
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "93%", sm: "90%", md: "1340px" },
        maxWidth: "100%",
        height: { xs: "300px", sm: "400px", md: "500px" },
        margin: { xs: "68px auto 0", md: "80px auto 0" },
        borderRadius: "10px",
        overflow: "hidden",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Slider {...sliderSettings}>
          {heroImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "500px" },
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </Slider>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
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
              width: { xs: "90%", sm: "80%", md: "610px" },
              fontFamily: "'SF Pro Display', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "24px", sm: "28px", md: "32px" },
              lineHeight: { xs: "28px", sm: "34px", md: "38px" },
              textAlign: { xs: "center", sm: "center", md: "center" },
              mb: { xs: 2, md: 3 },
            }}
          >
            Enjoy Your Dream Vacation
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            ...textVariants,
            visible: {
              ...textVariants.visible,
              transition: { ...textVariants.visible.transition, delay: 0.4 },
            },
          }}
        >
          <Typography
            sx={{
              width: { xs: "100%", sm: "80%", md: "650px" },
              fontFamily: "'SF Pro Display', sans-serif",
              fontWeight: 400,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: "140%",
              letterSpacing: "0.02em",
              textAlign: { xs: "center", sm: "center", md: "center" },
            }}
          >
            Plan and book your perfect trip with expert advice, travel tips,
            destination information and inspiration from us
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroBanner;
