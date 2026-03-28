// ResetPassword.jsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import bg from "../assets/bg.jpg";
import "@qpokychuk/sf-pro-display";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setError("");
      await axios.post("http://localhost:3002/api/reset-password", {
        token,
        newPassword,
      });
      setSuccess("Password reset successfully! You can now sign in.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
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
          px: 4,
          display: "flex",
          alignItems: "center",
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

      {/* Glassy Card */}
      <Box
        sx={{
          mt: "200px",
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
            mb: 2,
          }}
        >
          Reset Your Password
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#C0E0FF",
            mb: 3,
          }}
        >
          Enter your new password below.
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{
            mb: 2,
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
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {success && (
          <Typography sx={{ color: "#C0E0FF", mb: 2 }}>{success}</Typography>
        )}
        <Button
          fullWidth
          onClick={handleSubmit}
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
          Reset Password
        </Button>
        <Typography sx={{ color: "#fff", fontSize: "16px" }}>
          Back to{" "}
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

export default ResetPassword;
