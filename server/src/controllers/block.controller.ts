import { Response } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// Block a user
export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.userId;
    const { userIdToBlock } = req.body;

    if (!userIdToBlock) {
      return res.status(400).json({ message: "userIdToBlock is required" });
    }

    const user = await User.findById(currentUserId);

    if (!user) {
      return res.status(404).json({ message: "Current user not found" });
    }

    // Avoid duplicate blocks
    if (!user.blockedUsers?.includes(userIdToBlock)) {
      user.blockedUsers?.push(userIdToBlock);
      await user.save();
    }

    return res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to block user" });
  }
};

// Unblock a user
export const unblockUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.userId;
    const { userIdToUnblock } = req.body;

    const user = await User.findById(currentUserId);

    if (!user)
      return res.status(404).json({ message: "Current user not found" });

    user.blockedUsers =
      user.blockedUsers?.filter((id) => id !== userIdToUnblock) || [];
    await user.save();

    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to unblock user" });
  }
};
