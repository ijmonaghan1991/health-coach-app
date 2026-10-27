import express from "express";

import {
  chatWithCoach,
} from "../controllers/aiController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat", protect, chatWithCoach);

export default router;