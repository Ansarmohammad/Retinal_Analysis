import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [params] = useSearchParams();
  const phone = params.get("phone");
  const navigate = useNavigate();

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://retinal-analysis-backend.onrender.com/verify-otp", {
        phone,
        otp
      });

      setMsg(res.data.message);

      if (res.data.message.includes("Verified")) {
        navigate(`/reset-password?phone=${phone}`);
      }

    } catch (err) {
      setMsg("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0e0e0e] border border-purple-800 rounded-3xl p-10 w-full max-w-md text-white">
        <h1 className="text-2xl text-purple-400 mb-4 text-center">Verify OTP</h1>

        <p className="text-purple-300 text-center mb-2">OTP sent to {phone}</p>

        <label className="block mb-2">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-purple-700 mb-4"
        />

        <button onClick={verifyOtp} className="w-full bg-purple-600 p-3 rounded-xl">
          Verify OTP
        </button>

        <p className="text-center mt-4 text-purple-300">{msg}</p>
      </div>
    </div>
  );
}
