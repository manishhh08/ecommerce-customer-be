import express from "express";
import { createNewUser, loginUser } from "../controllers/authController.js";
import {
  createUserValidation,
  loginValidation,
} from "../middleware/joiMiddleware.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUserValidation, createNewUser);
router.post("/login", loginValidation, loginUser);

export default router;
