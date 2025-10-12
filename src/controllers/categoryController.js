import { getAllCategories } from "../models/categories/categoryModel.js";

// GET /api/v1/category
export const retrieveAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    return res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch categories",
    });
  }
};
