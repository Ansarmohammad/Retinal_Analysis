import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        userid: username,
        password: password,
      });

      setMsg(res.data.msg);

      if (res.data.msg === "Login Successful ✅") {
        // ✅ Save user to localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Redirect to Homepage
        window.location.href = "/";
      }
    } catch (error) {
      setMsg("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0e0e0e] border border-purple-800 shadow-2xl shadow-purple-900 rounded-3xl p-10 w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-8">
          Login
        </h1>

        {/* Username */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-lg">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-[#1a1a1a] text-white rounded-xl border border-purple-700"
            placeholder="Enter username"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-[#1a1a1a] text-white rounded-xl border border-purple-700"
            placeholder="Enter password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-lg shadow-purple-900"
        >
          Login
        </button>

        <p className="text-center mt-4 text-purple-300">{msg}</p>

        <div className="mt-6 flex flex-col gap-3 text-center text-sm text-purple-300">
          <a href="/forgot-password" className="hover:text-purple-400">
            Forgot Password?
          </a>
          <a href="/signup" className="hover:text-purple-400 font-semibold">
            New User? Create an Account
          </a>
        </div>
      </motion.div>
    </div>
  );
}