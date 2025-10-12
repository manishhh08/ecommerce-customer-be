import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCustomerDetail } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getCustomerDetail);
// router.post("/register", authMiddleware);

export default router;
