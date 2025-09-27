const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    location: { type: String, required: true },
    religion: { type: String },
    hobbies: [{ type: String }],
    education: { type: String },
    profession: { type: String },
    bio: { type: String },

    partnerPreferences: {
      ageRange: {
        min: { type: Number, default: 18 },
        max: { type: Number, default: 99 },
      },
      gender: {
        type: String,
        enum: ["male", "female", "other", "any"],
        default: "any",
      },
      education: { type: String },
      religion: { type: String },
      location: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
