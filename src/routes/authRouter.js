import express from "express";
import { createNewCustomer, loginCustomer } from "../controllers/authController.js";
import {
  createUserValidation,
  loginValidation,
} from "../middleware/joiMiddleware.js";

const router = express.Router();

router.post("/", createUserValidation, createNewCustomer);
router.post("/login", loginValidation, loginCustomer);

export default router;
