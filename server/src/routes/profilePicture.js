const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const User = require("../models/User");

// Upload a new picture
router.post("/", authMiddleware, upload.single("picture"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const newPic = {
      url: req.file.path,
      visibility: req.body.visibility || "private",
    };
    user.profilePictures.push(newPic);
    await user.save();
    res.status(201).json({ message: "Picture uploaded", picture: newPic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update picture visibility
router.patch("/:picId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const pic = user.profilePictures.id(req.params.picId);
    if (!pic) return res.status(404).json({ message: "Picture not found" });

    pic.visibility = req.body.visibility || pic.visibility;
    await user.save();
    res.json({ message: "Visibility updated", picture: pic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a picture
router.delete("/:picId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const pic = user.profilePictures.id(req.params.picId);
    if (!pic) return res.status(404).json({ message: "Picture not found" });

    pic.remove();
    await user.save();
    res.json({ message: "Picture deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
