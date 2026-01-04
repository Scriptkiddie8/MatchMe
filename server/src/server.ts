import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend origin later
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message, senderId }) => {
    io.to(roomId).emit("receiveMessage", {
      message,
      senderId,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});
