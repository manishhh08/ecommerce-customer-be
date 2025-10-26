import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createReview,
  getAllReviews,
  getPublicReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// ===== Create Review (Private) =====
router.post("/", authMiddleware, createReview);

// ===== Get All Reviews (Private - for logged-in users or admins) =====
router.get("/", authMiddleware, getAllReviews);

// ===== Get Public Reviews (No auth needed) =====
router.get("/public", getPublicReviews);

export default router;
