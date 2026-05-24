import React, { useState } from "react";
import axios from "axios";

export default function ProfileModal({ user, onClose, setUser }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const res = await axios.post("http://localhost:5000/update-profile", {
        userid: user.userid,
        ...updatedData,
      });

      setMsg(res.data.message);

      if (res.data.success) {
        setUser((prev) => ({
          ...prev,
          name: updatedData.name,
          email: updatedData.email,
          phone: updatedData.phone,
        }));
        setTimeout(() => {
          setEditMode(false);
          setMsg("");
        }, 1000);
      }
    } catch (err) {
      setMsg("Update failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#0e0e0e] border border-purple-800 shadow-2xl rounded-3xl p-10 w-full max-w-lg text-white">
        
        <h1 className="text-3xl font-extrabold text-purple-400 text-center mb-6">
          {editMode ? "Edit Profile" : "Profile Details"}
        </h1>

        {/* VIEW MODE */}
        {!editMode && (
          <>
            <p className="text-lg mb-2"><b>Name:</b> {user.name}</p>
            <p className="text-lg mb-2"><b>User ID:</b> {user.userid}</p>
            <p className="text-lg mb-2"><b>Email:</b> {user.email}</p>
            <p className="text-lg mb-6"><b>Phone:</b> {user.phone}</p>

            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl mb-3"
            >
              Update Profile
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 py-3 rounded-xl"
            >
              Close
            </button>
          </>
        )}

        {/* EDIT MODE */}
        {editMode && (
          <>
            <label className="block mb-2">Name</label>
            <input
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#1a1a1a] mb-4"
            />

            <label className="block mb-2">Email</label>
            <input
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#1a1a1a] mb-4"
            />

            <label className="block mb-2">Phone</label>
            <input
              name="phone"
              value={updatedData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#1a1a1a] mb-4"
            />

            <label className="block mb-2">New Password (optional)</label>
            <input
              type="password"
              name="password"
              value={updatedData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#1a1a1a] mb-4"
              placeholder="Enter new password"
            />

            <p className="text-purple-300 text-center">{msg}</p>

            <button
              onClick={updateProfile}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl mb-3"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 py-3 rounded-xl"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
