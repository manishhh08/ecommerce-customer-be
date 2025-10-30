import config from "../config/config.js";
import crypto from "crypto";
import { emailFormatter, transporter } from "../config/nodemailer.js";
import {
  findByFilter,
  newCustomer,
  updateById,
} from "../models/customers/customerModel.js";
import { encodeFunction, decodeFunction } from "../utils/encodeHelper.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const createNewCustomer = async (req, res) => {
  try {
    const { fname, lname, email, password, phone } = req.body;

    const emailVerify = async (emailDetails) => {
      const emailResult = await transporter.sendMail(emailDetails);
    };
    const randomString = uuidv4();

    const verificationLink = `${config.frontend.domain}/verify?token=${randomString}&email=${email}`;

    const formattedEmail = emailFormatter(
      email,
      "Verify your email",
      fname,
      verificationLink
    );
    const existingCustomer = await findByFilter({ email });
    if (existingCustomer) {
      return res.status(400).json({
        status: "error",
        message: "Email is already registered",
      });
    }
    const hashedPassword = encodeFunction(password);

    // await emailVerify(formattedEmail);

    const info = await transporter.sendMail(formattedEmail);
    console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    const user = await newCustomer({
      email,
      fname,
      lname,
      password: hashedPassword,
      phone,
      verificationToken: randomString,
    });
    if (user?._id) {
      return res.status(200).json({
        status: "success",
        message: "Account created. Please verify your email to Login.",
      });
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating customer" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const verifyCustomer = async (req, res) => {
  try {
    const { token, email } = req.body;
    const user = await findByFilter({ email: email });
    if (!user) {
      res.status(500).json({ status: "error", message: "User not found" });
    }
    if (user.verificationToken === token) {
      const updateIsVerified = await updateById(user._id, { isVerified: true });
      if (updateIsVerified)
        return res
          .status(200)
          .json({ status: "success", message: "Verification complete" });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Verification token did not match" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const loginCustomer = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await findByFilter({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const isPasswordValid = decodeFunction(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(500).json({
        status: "error",
        message: "Please verify your email to Login",
      });
    }

    const payload = {
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      role: user.role || "customer",
    };

    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    return res.status(200).json({
      status: "success",
      message: "Login Successful",
      accessToken,
      refreshToken,
      customer: user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ status: "error", message: "Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findByFilter({ email });
    if (!user) {
      // always respond success to prevent email enumeration
      return res.status(200).json({
        status: "success",
        message: "If that email exists, a reset link has been sent.",
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save hashed token + expiry in DB
    await updateById(user._id, {
      resetPasswordTokenHash: hashedToken,
      resetPasswordExpiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
    });

    // const resetUrl = `${config.frontend.domain}/reset-password?token=${resetToken}&email=${email}`;
    const resetUrl = `http://localhost:4001/api/auth/reset-password?token=${resetToken}&email=${email}`;

    // Send email
    const emailContent = emailFormatter(
      email,
      "Reset Your Password",
      user.fname,
      resetUrl
    );
    await transporter.sendMail(emailContent);

    return res.status(200).json({
      status: "success",
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to send password reset email",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const customer = await findByFilter({
      email,
      resetPasswordTokenHash: hashedToken,
    });

    if (
      !customer ||
      !customer.resetPasswordExpiresAt ||
      customer.resetPasswordExpiresAt < Date.now()
    ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateById(customer._id, {
      password: hashedPassword,
      resetPasswordTokenHash: undefined,
      resetPasswordExpiresAt: undefined,
    });

    return res.status(200).json({
      status: "success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to reset password",
    });
  }
};
