import { Request, Response } from "express";
import Chat from "../models/chat.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create or get chat room between 2 users
export const getOrCreateChat = async (req: AuthRequest, res: Response) => {
  try {
    const { participantId } = req.body;
    const userId = req.userId;

    if (!participantId)
      return res.status(400).json({ message: "participantId is required" });

    // Create a deterministic roomId (sorted ids)
    const roomId = [userId, participantId].sort().join("_");

    let chat = await Chat.findOne({ roomId });

    if (!chat) {
      chat = await Chat.create({
        roomId,
        participants: [userId, participantId],
        messages: [],
      });
    }

    return res.status(200).json({ chat });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create/get chat" });
  }
};

// Get all messages for a chat room
export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const chat = await Chat.findOne({ roomId });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    return res.status(200).json({ messages: chat.messages });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch messages" });
  }
};
