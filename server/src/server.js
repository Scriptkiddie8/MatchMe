require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const { initTransporter } = require("./utils/email");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const profilePictureRoutes = require("./routes/profilePicture");
const searchRoutes = require("./routes/search");
const savedSearchRoutes = require("./routes/savedSearch");
const chatRoutes = require("./routes/chat"); // <-- Add chat route

const app = express();
app.use(cors());
app.use(express.json());

// init DB
connectDB(process.env.MONGO_URI);

// init email transporter (optional)
if (process.env.EMAIL_HOST) {
  initTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  });
}

app.get("/", (req, res) => res.send("MatchMe API running"));

// routes
app.use("/api/profile/pictures", profilePictureRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/saved-search", savedSearchRoutes);
app.use("/api/chat", chatRoutes); // <-- add chat routes

// --- Socket.io setup ---
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.io connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// listen with Socket.io
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
