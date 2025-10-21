import { updateById } from "../models/customers/customerModel.js";

export const getCustomerDetail = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found!",
      });
    }

    return res.json({
      status: "success",
      message: "User details fetched successfully",
      customer: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve user details",
    });
  }
};

export const updateCustomerDetail = async (req, res) => {
  try {
    const customerId = req.user?._id;
    const updateObj = req.body;

    if (!customerId) {
      return res.status(404).json({
        status: "error",
        message: "User not found!",
      });
    }
    const updatedUser = await updateById(customerId, updateObj, { new: true });

    return res.json({
      status: "success",
      message: "User details updated successfully",
      customer: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update user details",
    });
  }
};
