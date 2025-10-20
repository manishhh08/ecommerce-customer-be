import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCustomerDetail, updateCustomerDetail } from "../controllers/customerController.js";

const router = express.Router();

router.get("/", authMiddleware, getCustomerDetail);

router.put("/", authMiddleware, updateCustomerDetail);

export default router;
