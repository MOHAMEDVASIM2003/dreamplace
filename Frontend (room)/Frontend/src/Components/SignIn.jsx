import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Facebook, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import Google from "../assets/Google.png";
import bg from "../assets/bg.jpg";
import { styled } from "@mui/system";
import "@qpokychuk/sf-pro-display";

const StyledCheckbox = styled("input")();

const CustomCheckbox = ({
  primaryColor = "#1677ff",
  secondaryColor = "#fff",
  primaryHoverColor = "#4096ff",
  checkboxDiameter = "20px",
  checkboxBorderRadius = "5px",
  checkboxBorderColor = "#d9d9d9",
  checkboxBorderWidth = 1,
  checkmarkSize = 1.2,
  ...props
}) => {
  return (
    <StyledCheckbox
      type="checkbox"
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      primaryHoverColor={primaryHoverColor}
      checkboxDiameter={checkboxDiameter}
      checkboxBorderRadius={checkboxBorderRadius}
      checkboxBorderColor={checkboxBorderColor}
      checkboxBorderWidth={checkboxBorderWidth}
      checkmarkSize={checkmarkSize}
      {...props}
    />
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setSuccessMessage("Successfully registered! Please sign in.");
    }
  }, [location.state]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3002/api/getregisters"
      );
      const users = response.data;

      const user = users.find(
        (u) =>
          u.Email.toLowerCase() === email.toLowerCase() &&
          u.Password === password
      );

      if (user) {
        if (keepSignedIn) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(user));
        }
        setSuccessMessage("Successfully logged in!");
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" }, 
        alignItems: "flex-start",
        
        pl: { md: "100px", xs: 0 }, 
        position: "relative",
      }}
    >
      {/* Transparent Navbar */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "68px",

          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          px: 4,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "absolute",
            left: "100px",
            top: "22px",
          }}
        >
          <img
            src={Logo}
            alt="My Dream Place Logo"
            style={{ width: "20px", height: "20px" }}
          />
          <Typography
            sx={{
              fontFamily: "SF Pro Display",
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "21px",
              color: "#fff",
            }}
          >
            My Dream Place
          </Typography>
        </Box>
      </Box>

      {/* Glassy Login Card */}
      <Box
        sx={{
          mt: "100px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          padding: { xs: 3, sm: 4 },
          width: { xs: "90%", sm: "400px" },
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          textAlign: { xs: "center", md: "left" }, 
        }}
      >
        <Typography
          sx={{
            fontFamily: "SF Pro Display",
            fontWeight: 600,
            fontSize: "28px",
            color: "#fff",
            mb: 4,
          }}
        >
          Sign in
        </Typography>
        {successMessage && (
          <Typography
            sx={{
              fontFamily: "SF Pro Display",
              fontSize: "14px",
              color: "#C0E0FF",
              mb: 2,
              textAlign: "center",
            }}
          >
            {successMessage}
          </Typography>
        )}
        {/* Email */}
        <TextField
          fullWidth
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error && email === "" ? error : ""}
          sx={{
            mb: 3,
            bgcolor: "rgba(255,255,255,0.3)",
            borderRadius: "4px",
            input: {
              color: "#fff",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              height: "44px",
              "& fieldset": { border: "none" },
            },
          }}
        />
        {/* Password */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error && email !== "" ? error : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            bgcolor: "rgba(255,255,255,0.3)",
            borderRadius: "4px",
            input: {
              color: "#fff",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              height: "44px",
              "& fieldset": { border: "none" },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 3,
            mr: -3,
          }}
        >
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
            }
            label={
              <Typography
                sx={{
                  position: "absolute",
                  fontFamily: "SF Pro Display",
                  fontSize: "14px",
                  color: "#fff",
                  left: "50px",
                }}
              >
                Keep me signed in
              </Typography>
            }
          />
          <Typography
            component={Link}
            to="/forgot-password"
            sx={{
              fontSize: "14px",
              color: "#C0E0FF",
              position: "absolute",
              right: "30px",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot Password
          </Typography>
        </Box>
        <Button
          fullWidth
          onClick={handleSignIn}
          disabled={loading}
          sx={{
            height: "44px",
            bgcolor: "#2F80ED",
            color: "#FFFFFF",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "15px",
            mb: 0,
            "&:hover": { bgcolor: "#1B6CCE" },
            "&:disabled": { bgcolor: "#B0C4DE" },
          }}
        >
          {loading ? "Signing in..." : "Continue with email"}
        </Button>
        {/* Divider */}
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", my: 4 }}
        >
          <Divider sx={{ flex: 1, borderColor: "#E0E0E0" }} />
          <Typography sx={{ mx: 2, color: "#fff", fontSize: "14px" }}>
            or use one of these options
          </Typography>
          <Divider sx={{ flex: 1, borderColor: "#E0E0E0" }} />
        </Box>
        <Button
          fullWidth
          startIcon={
            <img src={Google} alt="Google" style={{ width: "20px" }} />
          }
          sx={{
            height: "44px",
            bgcolor: "#fff",
            color: "#4F4F4F",
            border: "1px solid #E0E0E0",
            borderRadius: "6px",
            mb: 2,
            "&:hover": { bgcolor: "#F5F5F5" },
          }}
        >
          Continue with Google
        </Button>
        <Button
          fullWidth
          startIcon={<Facebook sx={{ width: "20px" }} />}
          sx={{
            height: "44px",
            bgcolor: "#475993",
            color: "#FFFFFF",
            borderRadius: "6px",
            mb: 3,
            "&:hover": { bgcolor: "#3A4A7A" },
          }}
        >
          Continue with Facebook
        </Button>
        <Typography
          sx={{ color: "#fff", fontSize: "16px", textAlign: "center" }}
        >
          Don’t have an account?{" "}
          <Typography
            component={Link}
            to="/register"
            sx={{
              color: "#C0E0FF",
              fontWeight: 500,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Register
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
