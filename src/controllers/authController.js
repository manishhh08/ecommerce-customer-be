import { newCustomer } from "../models/customers/customerModel.js";

export const createNewUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  //   const hashedPassword = encodeFunction(password);
  try {
    const customer = await newCustomer({ email, fname, lname, password });
    if (customer) {
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
