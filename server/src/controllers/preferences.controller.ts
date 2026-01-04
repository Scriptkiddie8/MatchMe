import { Request, Response } from "express";
import User from "../models/user.model";

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // coming from auth middleware

    const preferences = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { partnerPreferences: preferences },
      { new: true }
    );

    return res.status(200).json({
      message: "Partner preferences updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update preferences",
    });
  }
};
