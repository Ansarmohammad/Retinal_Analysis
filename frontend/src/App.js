import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Predict from "./components/Predict";

import HomePage from "./components/HomePage";
import LoginPage from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/ProfileModal";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyOTP from "./components/VerifyOTP";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/predict" element={<Predict />} />

      </Routes>
    </BrowserRouter>
  );
}
