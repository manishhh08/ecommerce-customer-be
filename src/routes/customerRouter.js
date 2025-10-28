import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { fetchRecentlyViewed, getCustomerDetail, recordRecentlyViewed, updateCustomerDetail } from "../controllers/customerController.js";

const router = express.Router();

router.get("/", authMiddleware, getCustomerDetail);

router.patch("/", authMiddleware, updateCustomerDetail);

router.get("/recently-viewed", authMiddleware, fetchRecentlyViewed);

router.post("/recently-viewed", authMiddleware, recordRecentlyViewed);

export default router;
