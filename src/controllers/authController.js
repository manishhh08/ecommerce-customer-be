import { findByFilter, newUser } from "../models/customers/userModel.js";
import { encodeFunction, decodeFunction } from "../utils/encodeHelper.js";
import { createAccessToken } from "../utils/jwt.js";

export const createNewUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const hashedPassword = encodeFunction(password);
  try {
    const user = await newUser({
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
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await findByFilter({ email });
    if (user) {
      const result = decodeFunction(password, user.password);

      let payload = {
        email: user.email,
      };

      let accessToken = createAccessToken(payload);
      console.log(111, accessToken);
      if (result) {
        return res.status(200).json({
          status: "success",
          message: "Login Successful",
          accessToken,
        });
      } else {
        return res
          .status(500)
          .json({ status: "error", message: "Invalid credentials" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server error" });
  }
};
