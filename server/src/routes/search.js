const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Search users based on filters
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { ageMin, ageMax, profession, location, religion } = req.query;

    const filters = {};

    if (ageMin || ageMax) {
      filters.age = {};
      if (ageMin) filters.age.$gte = Number(ageMin);
      if (ageMax) filters.age.$lte = Number(ageMax);
    }

    if (profession) filters.profession = profession;
    if (location) filters.location = location;
    if (religion) filters.religion = religion;

    const users = await User.find(filters).select("-password"); // exclude password

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
