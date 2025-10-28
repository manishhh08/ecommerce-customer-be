import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createReview,
  getReviewsByProduct,
} from "../controllers/reviewController.js";

const router = express.Router();

// ===== Create Review (Private) =====
router.post("/", authMiddleware, createReview);

// Get all active reviews for one product
router.get("/product/:productId", getReviewsByProduct);

export default router;
