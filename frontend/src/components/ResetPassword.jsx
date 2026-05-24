import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const naveigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [params] = useSearchParams();
  const phone = params.get("phone");

  const updatePassword = async () => {
    try {
      const res = await axios.post("https://retinal-analysis-backend.onrender.com/reset-password", {
        phone,
        password
      });
      setMsg(res.data.message);
      if(res.data.message==="Password reset successful ✅") {
        naveigate("/login");
      }
    } catch {
      setMsg("Error updating password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0e0e0e] border border-purple-800 rounded-3xl p-10 w-full max-w-md text-white">
        <h1 className="text-2xl text-purple-400 mb-4 text-center">Reset Password</h1>

        <p className="text-purple-300 text-center mb-4">Phone: {phone}</p>

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-purple-700 mb-4"
          placeholder="New Password"
        />

        <button onClick={updatePassword} className="w-full bg-purple-600 p-3 rounded-xl">
          Update Password
        </button>

        <p className="text-center mt-4 text-purple-300">{msg}</p>
      </div>
    </div>
  );
}
