import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Facebook, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import Google from "../assets/Google.png";
import bg from "../assets/bg.jpg";
import "@qpokychuk/sf-pro-display";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = () => {
    if (
      password.length < 10 ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError(
        "Password must be at least 10 characters, including lowercase letters and numbers"
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setError("");
      setStep(2);
    } else {
      setError("Please enter a valid email address");
    }
  };

  const handlePasswordSubmit = async () => {
    if (validatePassword()) {
      setError("");
      try {
        await axios.post("http://localhost:3002/api/postregister", {
          Email: email,
          Password: password,
        });
        navigate("/signin", { state: { registrationSuccess: true } });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "86.30vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
        alignItems: "flex-start",
        pl: { md: "100px", xs: 0 },
        pt: "100px",
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
              color: "#fff",
            }}
          >
            My Dream Place
          </Typography>
        </Box>
      </Box>

      {/* Register Card */}
      <Box
        sx={{
          mt: "80px",
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
        {step === 1 ? (
          <>
            <Typography
              sx={{
                fontFamily: "SF Pro Display",
                fontWeight: 600,
                fontSize: "28px",
                color: "#fff",
                mb: 4,
              }}
            >
              Register
            </Typography>
            <TextField
              fullWidth
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                  "& fieldset": { border: "none" },
                },
              }}
            />
            <Button
              fullWidth
              onClick={handleEmailSubmit}
              sx={{
                height: "44px",
                bgcolor: "#2F80ED",
                color: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "15px",
                mb: 4,
                "&:hover": { bgcolor: "#1B6CCE" },
              }}
            >
              Continue with email
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                my: 3,
              }}
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
          </>
        ) : (
          <>
            <Typography
              sx={{
                fontFamily: "SF Pro Display",
                fontWeight: 600,
                fontSize: "28px",
                color: "#fff",
                mb: 2,
              }}
            >
              Create password
            </Typography>
            <Typography
              sx={{
                color: "#C0E0FF",
                fontSize: "14px",
                mb: 3,
                textAlign: "center",
              }}
            >
              Use a minimum of 10 characters, including lowercase letters and
              numbers.
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                  "& fieldset": { border: "none" },
                },
              }}
            />
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                  "& fieldset": { border: "none" },
                },
              }}
            />
            <Button
              fullWidth
              onClick={handlePasswordSubmit}
              sx={{
                height: "44px",
                bgcolor: "#2F80ED",
                color: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "15px",
                mb: 3,
                "&:hover": { bgcolor: "#1B6CCE" },
              }}
            >
              Create account
            </Button>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#fff",
                textAlign: "center",
                mb: 3,
              }}
            >
              By creating an account, you agree with our{" "}
              <span style={{ color: "#C0E0FF", cursor: "pointer" }}>Terms</span>{" "}
              and{" "}
              <span style={{ color: "#C0E0FF", cursor: "pointer" }}>
                Privacy
              </span>
              .
            </Typography>
          </>
        )}

        <Typography
          sx={{ color: "#fff", fontSize: "16px", textAlign: "center" }}
        >
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/signin"
            sx={{
              color: "#C0E0FF",
              fontWeight: 500,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
