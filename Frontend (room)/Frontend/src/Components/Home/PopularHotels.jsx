import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import Lake from "../../assets/Lake.png";
import Recce from "../../assets/Recce.png";
import Fireside from "../../assets/Fireside.png";
import Oculous from "../../assets/Oculous.png";

const popularHotels = [
  {
    name: "Lakeside Motel Warefront",
    properties: "2246 properties",
    image: Lake,
  },
  {
    name: "Recce Graham resort",
    properties: "1278 properties",
    image: Recce,
  },
  {
    name: "Fireside Dinners",
    properties: "480 properties",
    image: Fireside,
  },
  {
    name: "Oculous Inn Stay",
    properties: "320 properties",
    image: Oculous,
  },
];

const StyledWrapper = styled.div`
  
  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      #000 0%,
      #000 1%,
      transparent 0%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      #000 0%,
      #000 89%,
      transparent 0%
    );
  }

  .slider .list {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: scroll 20s linear infinite;
  }

  .slider .list .item {
    width: var(--width);
    height: var(--height);
    flex-shrink: 0;
    transition: filter 0.5s;
  }

  /* ✅ Margin on first and last card */
  .slider .list .item:first-child {
    margin-left: 45px; /* You can increase this if needed */
  }

  .slider .list .item:last-child {
    margin-right: 40px; /* Same here */
  }

  .slider .list .item .card {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    
    overflow: hidden;
    background: #fff;
  }

  .slider .list .item .card-image {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(
        calc((-1 * var(--width) - 20px) * ${popularHotels.length})
      );
    }
  }

  .slider:hover .list {
    animation-play-state: paused;
  }

  .slider:hover .item {
    filter: grayscale(1);
  }

  .slider .item:hover {
    filter: grayscale(0);
  }
`;


const PopularHotels = () => {
  const duplicatedHotels = [...popularHotels, ...popularHotels];

  return (
    <Box
      sx={{
        
        width: "100%",
        px: { xs: 3.3, md: 10 }, 
        mt: { xs: 4, md: 8 },
      }}
    >
      <Typography
        sx={{
          fontFamily: "SF Pro Display",
          fontWeight: 600,
          fontSize: { xs: 24, md: 28 },
          lineHeight: "33px",
          color: "#181818",
          mb: 4,
        }}
      >
        Popular hotels
      </Typography>

      <StyledWrapper>
        <div
          className="slider"
          style={{
            "--width": "322px",
            "--height": "380px",
          }}
        >
          <div className="list">
            {duplicatedHotels.map((hotel, idx) => (
              <div key={idx} className="item">
                <div className="card">
                  <Box
                    className="card-image"
                    sx={{ backgroundImage: `url(${hotel.image})` }}
                  />
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "SF Pro Display",
                        fontWeight: 600,
                        fontSize: 20,
                        lineHeight: "24px",
                        color: "#181818",
                      }}
                    >
                      {hotel.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "SF Pro Display",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: "17px",
                        letterSpacing: "0.02em",
                        color: "#181818",
                      }}
                    >
                      {hotel.properties}
                    </Typography>
                  </Box>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StyledWrapper>
    </Box>
  );
};

export default PopularHotels;
