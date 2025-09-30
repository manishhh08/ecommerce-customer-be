import {
  findByFilter,
  newCustomer,
} from "../models/customers/customerModel.js";
import { encodeFunction, decodeFunction } from "../utils/encodeHelper.js";
import { createAccessToken } from "../utils/jwt.js";

export const createNewUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const hashedPassword = encodeFunction(password);
  try {
    const user = await newCustomer({
      email,
      fname,
      lname,
      password: hashedPassword,
    });
    if (user) {
      return res
        .status(200)
        .json({ status: "success", message: "Customer created successfully" });
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating customer" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await findByFilter({ email });

    if (!user) {
      console.log("Login failed: user not found for email", email);
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const isPasswordValid = decodeFunction(password, user.password);

    if (!isPasswordValid) {
      console.log("Login failed: wrong password for email", email);
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
    console.log("Login successful, token:", accessToken);

    return res.status(200).json({
      status: "success",
      message: "Login Successful",
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ status: "error", message: "Server Error" });
  }
};
