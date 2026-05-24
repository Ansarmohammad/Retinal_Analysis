import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      const res = await axios.post("https://retinal-analysis-backend.onrender.com/forgot-password", { phone });
      setMsg(res.data.message);

      if (res.data.message.includes("OTP sent")) {
        // ✅ Move to verify page
        navigate(`/verify-otp?phone=${phone}`);
      }

    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0e0e0e] border border-purple-800 rounded-3xl p-10 w-full max-w-md text-white">
        <h1 className="text-2xl text-purple-400 mb-4 text-center">Forgot Password</h1>

        <label className="block mb-2">Enter Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-purple-700 mb-4"
        />

        <button onClick={sendOTP} className="w-full bg-purple-600 p-3 rounded-xl">
          Send OTP
        </button>

        <p className="text-center mt-4 text-purple-300">{msg}</p>
      </div>
    </div>
  );
}
