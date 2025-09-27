import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  deleteMyProfile,
} from "../controllers/profile.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", protect, createOrUpdateProfile);
router.get("/", protect, getMyProfile);
router.delete("/", protect, deleteMyProfile);

export default router;
