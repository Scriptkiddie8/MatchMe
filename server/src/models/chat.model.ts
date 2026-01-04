import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  roomId: string;
  participants: string[]; // userIds
  messages: {
    sender: string;
    message: string;
    createdAt: Date;
  }[];
}

const chatSchema = new Schema<IChat>({
  roomId: { type: String, required: true, unique: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IChat>("Chat", chatSchema);
