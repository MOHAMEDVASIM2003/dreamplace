import React from "react";
import { Box, Typography, Link } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Restrictions = () => {
  const handleLearnMoreClick = (event) => {
    event.preventDefault();
    window.open("https://data.who.int/dashboards/covid19/cases", "_blank");
  };

  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 10 }, // instead of negative margin
        px: { xs: 2, sm: 0 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1300px",
          backgroundColor: "rgba(252, 239, 202, 1)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          px: 3,
          py: 2,
        }}
      >
        <WarningAmberIcon sx={{ color: "#292D32" }} />
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontSize: "16px",
            color: "#333333",
          }}
        >
          Check the latest COVID-19 restrictions before you travel.{" "}
          <Link
            href="https://data.who.int/dashboards/covid19/cases"
            onClick={handleLearnMoreClick}
            underline="always"
            sx={{
              color: "#2F80ED",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Learn more
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Restrictions;
