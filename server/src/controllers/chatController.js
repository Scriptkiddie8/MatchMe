const Message = require("../models/Message");

// Get public or private messages
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    let messages;

    if (userId) {
      // Private chat
      messages = await Message.find({
        $or: [
          { sender: req.user._id, receiver: userId },
          { sender: userId, receiver: req.user._id },
        ],
      }).sort({ createdAt: 1 });
    } else {
      // Public chat
      messages = await Message.find({ isPublic: true }).sort({ createdAt: 1 });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
