import { Router } from "express";
import { blockUser, unblockUser } from "../controllers/block.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Block a user
router.post("/block", authMiddleware, blockUser);

// Unblock a user
router.post("/unblock", authMiddleware, unblockUser);

export default router;
