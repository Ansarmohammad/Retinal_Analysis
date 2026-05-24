import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    userid: "",
    pwd: "",
    cpwd: "",
    email: "",
    phone: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (form.pwd !== form.cpwd) {
      setMsg("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name: form.name,
        userid: form.userid,
        pwd: form.pwd,
        email: form.email,
        phone: form.phone,
      });

      setMsg(res.data.msg);

      if (res.data.msg === "Signup Successful ✅") {
        setTimeout(() => (window.location.href = "/login"), 1000);
      }
    } catch (err) {
      setMsg("❌ Error: Could not create account");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0e0e0e] border border-purple-800 shadow-2xl shadow-purple-900 rounded-3xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-8">
          Create Account
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-purple-700 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter your full name"
          />
        </div>

        {/* User ID */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">User ID</label>
          <input
            type="text"
            name="userid"
            value={form.userid}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-purple-700 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Choose a username"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-purple-700 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-purple-700 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter phone number"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">Password</label>
          <input
            type="password"
            name="pwd"
            value={form.pwd}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-purple-700 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Confirm Password</label>
          <input
            type="password"
            name="cpwd"
            value={form.cpwd}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a1a1a] rounded-xl border border-purple-700 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Confirm password"
          />
        </div>

        {/* API Message */}
        <p className="text-center text-purple-300 mb-4">{msg}</p>

        {/* Submit Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-lg shadow-purple-900 transition"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-purple-300 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:text-purple-500 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;