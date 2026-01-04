import { Response } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// GET logged-in user's profile
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// UPDATE logged-in user's profile
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
