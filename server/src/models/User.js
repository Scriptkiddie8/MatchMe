const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"], default: null },
    location: { type: String },
    religion: { type: String },
    hobbies: { type: [String], default: [] },
    education: { type: String },
    profession: { type: String },
    bio: { type: String },
    // You can add more profile fields (photos, visibility flags, etc.)
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, unique: true, sparse: true }, // store as normalized string
    passwordHash: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    profile: { type: profileSchema, default: {} },
    profilePictures: [
      {
        url: String,
        visibility: {
          type: String,
          enum: ["public", "private", "connections"],
          default: "private",
        },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
