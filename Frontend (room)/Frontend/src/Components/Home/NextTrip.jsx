import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Aus from "../../assets/Aus.png";
import Top from "../../assets/Top.png";
import World from "../../assets/World.png";

const inspirationCards = [
  {
    title: "Sydeny's 10 most fashionable 5 star hotels",
    description:
      "Browse the fastest growing tourism sector in the heart of Australia tourism capital ....",
    image: Aus,
  },
  {
    title: "Top cities for Vegan Travellers",
    description:
      "Top sites where you do not have to worry about being a vegan. Our tourist guide is here...",
    image: Top,
  },
  {
    title: "World's top destinations during and post covid timeline",
    description:
      "Pandemic is still intact and here for a longer time. Here's where your next destination...",
    image: World,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
  }),
};

const NextTrip = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        mt: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        ml: { xs: -2, md: 6 },
      }}
    >
      <motion.div initial="hidden" animate="visible" variants={textVariants}>
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 600,
            fontSize: { xs: 24, md: 28 },
            lineHeight: "33px",
            color: "#181818",
            mb: 4,
            
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Get inspiration for your next trip
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: 3,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {inspirationCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={idx}
            style={{ width: "100%", maxWidth: 436 }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 280,
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                "&:hover .cardContent": {
                  transform: "translateY(0)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%), url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 1,
                  transition: "0.5s ease",
                },
              }}
            >
              <Box
                className="cardContent"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  color: "#fff",
                  padding: 3,
                  transform: "translateY(100%)",
                  transition:
                    "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "SF Pro Display",
                    fontWeight: 600,
                    fontSize: 18,
                    lineHeight: "22px",
                    mb: 1,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "SF Pro Display",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "19px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.description}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default NextTrip;
