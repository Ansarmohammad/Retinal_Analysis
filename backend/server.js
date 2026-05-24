const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { spawn } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/retina_users")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  userid: String,
  pwd: String,
  email: String,
  phone: String,
  otp: String,
  otpExpiry: Number,
});

const User = mongoose.model("User", userSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ===========================
   SIGNUP
=========================== */

app.post("/signup", async (req, res) => {
  try {
    const { name, userid, pwd, email, phone } = req.body;

    const exists = await User.findOne({ userid });

    if (exists) {
      return res.json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(pwd, 10);

    await User.create({
      name,
      userid,
      pwd: hash,
      email,
      phone: phone.toString(),
    });

    res.json({ msg: "Signup Successful ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Signup Failed" });
  }
});

/* ===========================
   LOGIN
=========================== */

app.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;

    const user = await User.findOne({ userid });

    if (!user) {
      return res.json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.pwd);

    if (!match) {
      return res.json({ msg: "Wrong Password" });
    }

    res.json({
      msg: "Login Successful ✅",
      user: {
        name: user.name,
        userid: user.userid,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Login Failed" });
  }
});

/* ===========================
   SEND OTP
=========================== */

app.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({
      phone: phone.toString(),
    });

    if (!user) {
      return res.json({
        message: "Phone not registered",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("✅ OTP:", otp);

    const smsRes = await axios.get(
      `https://2factor.in/API/V1/f4258757-bd71-11f0-bdde-0200cd936042/SMS/${phone}/${otp}`
    );

    console.log("✅ SMS Response:", smsRes.data);

    res.json({
      message: "OTP sent successfully ✅",
    });
  } catch (error) {
    console.log("❌ SMS Error:", error);

    res.json({
      message: "SMS sending failed ❌",
    });
  }
});

/* ===========================
   VERIFY OTP
=========================== */

app.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({
      phone: phone.toString(),
    });

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.json({
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.json({
        message: "OTP expired",
      });
    }

    res.json({
      message: "OTP Verified ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "OTP verification failed",
    });
  }
});

/* ===========================
   UPDATE PROFILE
=========================== */

app.post("/update-profile", async (req, res) => {
  try {
    const { userid, name, email, phone, password } = req.body;

    const user = await User.findOne({ userid });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    if (password.trim() !== "") {
      user.pwd = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

/* ===========================
   RESET PASSWORD
=========================== */

app.post("/reset-password", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({
      phone: phone.toString(),
    });

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    user.pwd = hash;
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Password reset successful ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Password reset failed",
    });
  }
});

/* ===========================
   RETINA ANALYSIS
=========================== */

app.post("/analyze", upload.single("image"), (req, res) => {
  try {
    const imagePath = req.file.path;

    const python = spawn(
      "C:\\Users\\ANSAR\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
      ["model/predict.py", imagePath]
    );

    let fullData = "";

    python.stdout.on("data", (data) => {
      fullData += data.toString();
    });

    python.stdout.on("end", () => {
      try {
        fullData = fullData.trim();

        console.log("✅ PYTHON RESPONSE:", fullData);

        res.json(JSON.parse(fullData));
      } catch (err) {
        console.log("❌ JSON Error:", err);
        console.log("❌ Received:", fullData);

        res.status(500).json({
          error: "Invalid JSON from Python",
        });
      }
    });

    python.stderr.on("data", (data) => {
      console.log("❌ Python Error:", data.toString());
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Prediction failed",
    });
  }
});

/* ===========================
   START SERVER
=========================== */

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});