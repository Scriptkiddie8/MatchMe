import { Router } from "express";
import { getOrCreateChat, getMessages } from "../controllers/chat.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Create or get chat room
router.post("/room", authMiddleware, getOrCreateChat);

// Get messages for a room
router.get("/room/:roomId", authMiddleware, getMessages);

export default router;
