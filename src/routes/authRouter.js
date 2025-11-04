import express from "express";
import {
  createNewCustomer,
  forgotPassword,
  loginCustomer,
  password,
  resetPassword,
  verifyCustomer,
} from "../controllers/authController.js";
import {
  createUserValidation,
  loginValidation,
  verifyUserValidation,
} from "../middleware/joiMiddleware.js";

const router = express.Router();

router.post("/register", createUserValidation, createNewCustomer);
router.post("/verify", verifyUserValidation, verifyCustomer);
router.post("/login", loginValidation, loginCustomer);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/password", password);

export default router;
