import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignIn from "../Components/SignIn";
import RegisterPage from "../Components/RegisterPage";
import ForgotAccount from "../Components/ForgotAccount";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotAccount />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
