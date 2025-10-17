import express from "express";
import {
  createNewCustomer,
  loginCustomer,
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

export default router;
