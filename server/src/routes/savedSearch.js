const express = require("express");
const SavedSearch = require("../models/SavedSearch");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a saved search
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, filters } = req.body;
    const savedSearch = await SavedSearch.create({
      user: req.user._id,
      name,
      filters,
    });
    res.json(savedSearch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all saved searches for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const searches = await SavedSearch.find({ user: req.user._id });
    res.json(searches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a saved search
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await SavedSearch.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
