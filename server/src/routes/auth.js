const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const { initTransporter, sendMail } = require("../utils/email");
const { saveOTP, verifyOTP } = require("../utils/otpStore");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const EMAIL_FROM = process.env.EMAIL_FROM;

// helper: create JWT
function createToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// REGISTER
// Accept either email+password or phone+password (or both). We require password.
router.post("/register", async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!password) return res.status(400).json({ error: "Password required" });
    if (!email && !phone)
      return res.status(400).json({ error: "Provide email or phone" });

    // check existing
    if (email) {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ error: "Email already registered" });
    }
    if (phone) {
      const exists = await User.findOne({ phone });
      if (exists)
        return res.status(400).json({ error: "Phone already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const emailVerificationToken = email
      ? crypto.randomBytes(20).toString("hex")
      : undefined;
    const emailVerificationExpires = email
      ? Date.now() + 24 * 60 * 60 * 1000
      : undefined;

    const user = new User({
      email,
      phone,
      passwordHash,
      emailVerificationToken,
      emailVerificationExpires,
    });

    await user.save();

    // send verification email if email provided
    if (email) {
      const verifyUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/auth/verify-email?token=${emailVerificationToken}&id=${user._id}`;
      const html = `<p>Welcome to MatchMe — click to verify your email:</p><p><a href="${verifyUrl}">Verify email</a></p>`;
      try {
        await sendMail({
          from: EMAIL_FROM,
          to: email,
          subject: "Verify your MatchMe email",
          html,
          text: `Visit ${verifyUrl} to verify your email`,
        });
      } catch (err) {
        console.warn("Failed to send email (dev):", err.message);
        // continue — user created but email not sent
      }
    }

    // if phone provided, optionally send OTP automatically — we'll leave that to separate endpoint
    res
      .status(201)
      .json({ message: "User registered. Verify email or phone as needed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// VERIFY EMAIL
router.get("/verify-email", async (req, res) => {
  try {
    const { token, id } = req.query;
    if (!token || !id) return res.status(400).send("Invalid verification link");
    const user = await User.findById(id);
    if (!user) return res.status(400).send("Invalid link");
    if (user.isEmailVerified) return res.send("Email already verified");
    if (!user.emailVerificationToken || user.emailVerificationToken !== token)
      return res.status(400).send("Invalid token");
    if (Date.now() > user.emailVerificationExpires)
      return res.status(400).send("Token expired");

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.send("Email verified — you can now login.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// LOGIN (email or phone + password)
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone
    if (!identifier || !password)
      return res.status(400).json({ error: "Provide identifier and password" });

    const query = identifier.includes("@")
      ? { email: identifier.toLowerCase() }
      : { phone: identifier };
    const user = await User.findOne(query);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    // optionally block login if email not verified (business rule)
    if (user.email && !user.isEmailVerified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    const token = createToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// SEND PHONE OTP (to register/verify phone)
router.post("/send-phone-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone required" });
    // you might want to validate phone format here
    // if phone belongs to an existing user mark accordingly or send OTP for verification
    const otp = saveOTP(phone);
    // In production: integrate with SMS provider (Twilio/MSG91/etc). For demo, we return OTP.
    res.json({ message: "OTP sent (demo)", otp }); // remove otp in production
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// VERIFY PHONE OTP
router.post("/verify-phone-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).json({ error: "Phone and otp required" });
    const result = verifyOTP(phone, otp);
    if (!result.ok) return res.status(400).json({ error: result.reason });

    // find user and mark phone verified
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: "No user for this phone" });
    user.isPhoneVerified = true;
    await user.save();
    res.json({ message: "Phone verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
