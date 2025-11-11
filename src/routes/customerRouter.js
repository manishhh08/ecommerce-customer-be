import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  fetchRecentlyViewed,
  getCustomerDetail,
  recordRecentlyViewed,
  updateCustomerDetail,
} from "../controllers/customerController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", authMiddleware, getCustomerDetail);

router.patch("/", authMiddleware, updateCustomerDetail);

router.get("/recently-viewed", authMiddleware, fetchRecentlyViewed);

router.post("/recently-viewed", authMiddleware, recordRecentlyViewed);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
