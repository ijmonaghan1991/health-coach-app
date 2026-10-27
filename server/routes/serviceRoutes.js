import express from "express";

import {
  getServices,
  getService,
  createService,
} from "../controllers/serviceController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getService);

router.post("/", protect, createService);

export default router;