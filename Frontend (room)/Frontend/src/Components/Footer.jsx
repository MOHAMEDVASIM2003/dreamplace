import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        pt: 3,
        px: { xs: 2, md: 10 },
        
      }}
    >
      {/* Main Grid Layout */}
      <Grid
        container
        spacing={2}
        justifyContent={{ xs: "center", md: "space-between" }}
        sx={{
          maxWidth: "1317px",
          mx: "auto",
          ml: { xs: 0, md: 0.2 },
        }}
      >
        {/* Logo and Description */}
        <Grid
          item
          xs={12}
          sm={6}
          md={2.4}
          mb={{xs:5}}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <img src={Logo} alt="Logo" style={{ width: 20, height: 20 }} />
              <Typography
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#1B1F2D",
                }}
              >
                My Dream Place
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "14px",
                color: "#4F4F4F",
                mt: 1,
              }}
            >
              Your next goto companion for travel
            </Typography>
          </Stack>
        </Grid>

        {/* Footer Sections */}
        <Grid container item xs={12} spacing={{xs:10,md:20}}>
          <Grid
            container
            item
            xs={12}
            spacing={{ xs: 32, md: 20 }}
            justifyContent={{ xs: "space-between", md: "flex-start" }}
          >
            {[
              {
                title: "Company",
                items: [
                  "About",
                  "Jobs",
                  "Newsroom",
                  "Advertising",
                  "Contact us",
                ],
              },
              {
                title: "Explore",
                items: [
                  "Australia",
                  "New Zealand",
                  "USA",
                  "Greece",
                  "Maldives",
                  "Singapore",
                ],
                seeMore: true,
              },
            ].map((section, i) => (
              <Grid item xs={6} sm={6} md={2.4} key={i}>
                <Typography
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  {section.title}
                </Typography>
                {section.items.map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    sx={{
                      display: "block",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontSize: "14px",
                      color: "#4F4F4F",
                      textDecoration: "none",
                      mb: "10px",
                      "&:hover": { color: "#2F80ED" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
                {section.seeMore && (
                  <Typography
                    component="a"
                    href="#see-more"
                    sx={{
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontSize: "14px",
                      color: "#2F80ED",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    See more
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={{ xs: 24, md: 20 }}
            justifyContent={{ xs: "space-between", md: "flex-start" }}
          >
            {[
              {
                title: "Terms and Policies",
                items: [
                  "Privacy Policy",
                  "Terms of use",
                  "Accessibility",
                  "Reward system policy",
                ],
              },
              {
                title: "Help",
                items: [
                  "Support",
                  "Cancel your bookings",
                  "Use Coupon",
                  "Refund Policies",
                  "International Travel",
                ],
              },
            ].map((section, i) => (
              <Grid item xs={6} sm={6} md={2.4} key={i}>
                <Typography
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#000",
                    mb: 2,
                  }}
                >
                  {section.title}
                </Typography>
                {section.items.map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    sx={{
                      display: "block",
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontSize: "14px",
                      color: "#4F4F4F",
                      textDecoration: "none",
                      mb: "10px",
                      "&:hover": { color: "#2F80ED" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#EBEBEB",
          mt: 6,
          ml: { xs: -2, md: -10 },
        }}
      >
        <Box
          sx={{
            maxWidth: "2317px",
            mx: "auto",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ml: { xs: 0, md: 120 },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "14px",
                color: "#4F4F4F",
              }}
            >
              © My Dream Place 2022
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
