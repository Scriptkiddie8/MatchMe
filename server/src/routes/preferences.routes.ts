import { Router } from "express";
import { updatePreferences } from "../controllers/preferences.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.put("/", authMiddleware, updatePreferences);

export default router;
