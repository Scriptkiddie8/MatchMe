// server/src/controllers/profile.js
import Profile from "../models/Profile.js";

// Create or Update Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      location,
      religion,
      hobbies,
      education,
      profession,
      bio,
      partnerPreferences,
    } = req.body;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            name,
            age,
            gender,
            location,
            religion,
            hobbies,
            education,
            profession,
            bio,
            partnerPreferences,
          },
        },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile({
      user: req.user.id,
      name,
      age,
      gender,
      location,
      religion,
      hobbies,
      education,
      profession,
      bio,
      partnerPreferences,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get My Profile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["email"]
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete My Profile
export const deleteMyProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
