import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchResults from "./Pages/SearchResults";
import UserAccounts from "./Pages/UserAccounts";
import SignIn from "./Components/SignIn";
import RegisterPage from "./Components/RegisterPage";
import ForgotAccount from "./Components/ForgotAccount";
import ResetPassword from "./Components/ResetPassword";
import ProductDetails from "./Pages/ProductDetails";
import Payment from "./Pages/PaymentPage";
import Activities from "./Pages/ActivitiesPage"; 
import { Box } from "@mui/material";
import WhatsApp from "./Components/WhatsApp"



function App() {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/discover" element={<SearchResults />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotAccount />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/account" element={<UserAccounts />} />
          <Route path="/overview/:id" element={<ProductDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/activities" element={<Activities />} />{" "}
        </Routes>
        <WhatsApp />
      </BrowserRouter>
    </Box>
  );
}

export default App;
