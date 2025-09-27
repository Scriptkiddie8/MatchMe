const express = require("express");
const { getMessages } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get messages
router.get("/:userId?", authMiddleware, getMessages);

module.exports = router;
