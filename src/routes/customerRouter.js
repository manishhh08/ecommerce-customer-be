import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserDetail } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getUserDetail);
// router.post("/register", authMiddleware);

export default router;
