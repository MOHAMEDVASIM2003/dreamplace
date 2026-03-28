import React, { useState, useEffect, Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from "../Components/Navbar";
import Payment from "../Components/Payment/Payment";
import Restrictions from "../Components/Restrictions";
import { Box, Typography } from "@mui/material";
import axios from "axios";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{ textAlign: "center", mt: 4, bgcolor: "rgba(242, 242, 242, 1)" }}
        >
          <Typography component="div" color="error">
            An error occurred: {this.state.error?.message || "Unknown error"}
          </Typography>
          <Typography component="div">
            Please try refreshing the page or contact support.
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/stripe-public-key"
        );
        const { publicKey } = response.data;
        if (!publicKey) {
          throw new Error("Stripe public key is missing");
        }
        setStripePromise(loadStripe(publicKey));
      } catch (err) {
        console.error("Error fetching Stripe public key:", err);
        setError("Failed to load payment system. Please try again later.");
      }
    };
    fetchStripeKey();
  }, []);

  if (error) {
    return (
      <Box
        sx={{ textAlign: "center", mt: 4, bgcolor: "rgba(242, 242, 242, 1)" }}
      >
        <Typography component="div" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!stripePromise) {
    return (
      <Box
        sx={{ textAlign: "center", mt: 4, bgcolor: "rgba(242, 242, 242, 1)" }}
      >
        <Typography component="div">Loading payment system...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        bgcolor: "rgba(242, 242, 242, 1)",
      }}
    >
      <Navbar />
      <Box
        sx={{
          pt: "80px",
          pl: "10px",
          maxWidth: "1240px",
          mx: "auto",
          bgcolor: "rgba(242, 242, 242, 1)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            fontFamily: "'SF Pro Display', sans-serif",
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: "38px",
            letterSpacing: "0.01em",
            color: "#1A1A1A",
            textAlign: "left",
            mb: "150px",
            mt: "50px",
          }}
        >
          <Typography
            component="div"
            sx={{
              fontFamily: "'SF Pro Display', sans-serif",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "38px",
              letterSpacing: "0.01em",
              color: "#1A1A1A",
              mb: -3,
            }}
          >
            Secure your reservation
          </Typography>
          <Box sx={{position:"absolute",width:"80%",left:"140px"}}>
            <Restrictions />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: "20px", bgcolor: "rgba(242, 242, 242, 1)" }}>
        <ErrorBoundary>
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default PaymentPage;
