import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileModal from "./ProfileModal";


// Local reusable button + card
const Button = ({ children, className, onClick }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const Card = ({ children, className }) => <div className={className}>{children}</div>;
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;

const images = ["./images/Chat.png","./images/img2.png","./images/img3.png"]; // example image

export default function HomePage() {
  // ✅ KEEP USER IN STATE
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* ✅ NAVBAR */}
      <nav className="w-full py-6 px-10 flex justify-between items-center bg-[#0e0e0e] shadow-2xl shadow-purple-900/50">
  <h1 className="text-3xl font-extrabold tracking-wider text-purple-400">
    RetinaVision AI
  </h1>

  <div className="flex gap-6 text-lg font-semibold">
    <a href="/predict" className="hover:text-purple-400 transition">
      Predict
    </a>

    <a href="#about" className="hover:text-purple-400 transition">
      About
    </a>

    {user ? (
      <>
        <button
          onClick={() => setShowProfile(true)}
          className="text-green-400 hover:text-green-500 transition"
        >
          {user.userid}'s Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
          className="text-red-400 hover:text-red-500 transition"
        >
          Logout
        </button>
      </>
    ) : (
      <a href="/login" className="hover:text-purple-400 transition">
        Login
      </a>
    )}
  </div>
</nav>


      {/* ✅ HERO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-12 py-20 gap-16">
        
        {/* ✅ Left Side Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-extrabold leading-tight text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
            AI-Powered Retina Disease Detection
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Upload a retina image and instantly detect diabetic retinopathy levels using
            our advanced deep learning model trained on thousands of retina fundus images.
            Fast, accurate and reliable.
          </p>

          <Button
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-2xl text-xl shadow-xl shadow-purple-900"
                onClick={() => (window.location.href = "/predict")} 
          >
  Start Prediction
</Button>

        </motion.div>

        {/* ✅ Right Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg overflow-hidden"
        >
          <Card className="bg-[#090909] border border-purple-900 shadow-2xl rounded-3xl">
            <CardContent className="p-4">
              <motion.div
                className="flex gap-4"
                animate={{ x: [0, -400, -800, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              >
                {images.concat(images).map((img, idx) => (
                 <img
  key={idx}
  src={img}
  alt="retina sample"
  className="rounded-2xl w-96 h-80 object-cover border border-purple-700"
/>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ✅ ABOUT SECTION */}
      <section id="about" className="px-12 py-20 bg-[#0c0c0c] text-gray-300">
        <h2 className="text-4xl font-bold text-purple-300 mb-6">About Our Model</h2>
        <p className="max-w-4xl text-lg leading-relaxed">
          Our retina disease classifier uses a hybrid Autoencoder + CNN architecture,
          capable of detecting multiple stages of diabetic retinopathy. Integrated with
          MERN + PyTorch for seamless real-time prediction.
        </p>
      </section>

      {/* ✅ FOOTER */}
      <footer className="py-6 text-center text-gray-500 bg-black border-t border-purple-900">
        © RetinaVision AI — Powered by MERN + PyTorch
      </footer>

      {/* ✅ ✅ ✅ PROFILE MODAL */}
      {showProfile && user && (
        <ProfileModal
          user={user}
          setUser={setUser}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}