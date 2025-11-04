import {
  addRecentlyViewedProduct,
  getRecentlyViewedProducts,
  updateById,
} from "../models/customers/customerModel.js";

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

export const recordRecentlyViewed = async (req, res) => {
  try {
    const customerId = req.user._id; // from auth middleware
    const { productId } = req.body;
    if (!productId)
      return res
        .status(400)
        .json({ status: "error", message: "productId required" });

    await addRecentlyViewedProduct(customerId, productId);
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
};

export const fetchRecentlyViewed = async (req, res) => {
  try {
    const customerId = req.user._id;
    const products = await getRecentlyViewedProducts(
      customerId,
      Number(req.query.limit) || 12
    );
    res.json({ status: "success", products });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
};
