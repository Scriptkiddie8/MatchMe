const mongoose = require("mongoose");

const savedSearchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // name of the saved search
  filters: {
    ageMin: Number,
    ageMax: Number,
    profession: String,
    location: String,
    religion: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SavedSearch", savedSearchSchema);
