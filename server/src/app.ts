import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import profileRoutes from "./routes/profile.routes";
import preferencesRoutes from "./routes/preferences.routes";
import matchRoutes from "./routes/match.routes";
import blockRoutes from "./routes/block.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/users", blockRoutes);
app.use("/api/chat", chatRoutes);

export default app;
