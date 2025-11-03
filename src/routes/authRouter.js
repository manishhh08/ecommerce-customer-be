import express from "express";
import {
  createNewCustomer,
  forgotPassword,
  loginCustomer,
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
router.get("/reset-password", (req, res) => {
  const token = req.query.token;
  res.send(`<form action="/api/auth/reset-password" method="POST">
              <input type="hidden" name="token" value="${token}" />
              <input type="email" name="email" />
              <input type="password" name="newPassword" />
              <button type="submit">Reset</button>
            </form>`);
});

export default router;
