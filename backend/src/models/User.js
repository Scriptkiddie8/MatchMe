import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    gender: String,
    location: String,
    religion: String,
    hobbies: [String],
    education: String,
    profession: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Partner Preferences
    preferences: {
      ageRange: { min: Number, max: Number },
      religion: String,
      location: String,
      education: String,
    },

    profilePictures: [
      {
        url: String,
        visibility: {
          type: String,
          enum: ["public", "private", "connections"],
          default: "public",
        },
      },
    ],

    isPremium: { type: Boolean, default: false },
    trustScore: { type: Number, default: 0 },
    matchScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
