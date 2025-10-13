import {
  findByFilter,
  newCustomer,
} from "../models/customers/customerModel.js";
import { encodeFunction, decodeFunction } from "../utils/encodeHelper.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";

export const createNewCustomer = async (req, res) => {
  try {
    const { fname, lname, email, password, phone } = req.body;

    const randomString = uuidv4();

    const existingCustomer = await findByFilter({ email });
    if (existingCustomer) {
      return res.status(400).json({
        status: "error",
        message: "Email is already registered",
      });
    }
    const hashedPassword = encodeFunction(password);

    const user = await newCustomer({
      email,
      fname,
      lname,
      password: hashedPassword,
      phone,
    });
    if (user?._id) {
      return res
        .status(200)
        .json({ status: "success", message: "Customer created successfully" });
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
      customer: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role || "customer",
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ status: "error", message: "Server Error" });
  }
};
