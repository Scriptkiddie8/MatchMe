import { Response } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import { calculateMatchPercentage } from "../utils/calculateMatchPercentage";

export const getMatches = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser || !currentUser.partnerPreferences) {
      return res.status(400).json({
        message: "Partner preferences not set",
      });
    }

    const { minAge, maxAge, gender, location } = currentUser.partnerPreferences;

    const query: any = {
      _id: {
        $ne: req.userId,
        $nin: currentUser.blockedUsers || [],
      },
    };

    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = minAge;
      if (maxAge) query.age.$lte = maxAge;
    }

    if (gender) query.gender = gender;
    if (location) query.location = location;

    const users = await User.find(query).select("-password");

    const matches = users.map((user) => ({
      user,
      matchPercentage: calculateMatchPercentage(
        currentUser as any,
        user as any
      ),
    }));

    // Sort by highest match %
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return res.status(200).json({
      count: matches.length,
      matches,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch matches",
    });
  }
};
