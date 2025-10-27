import {
  getAllCategories,
  getAllSubCategories,
  getProductDetails,
} from "../models/categories/categoryModel.js";

export const retrieveAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    const subCategories = await getAllSubCategories();

    return res.status(200).json({
      status: "success",
      categories,
      subCategories,
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch categories",
    });
  }
};

export const fetchCategoryProducts = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await getProductDetails({ slug });

    return res.status(200).json({
      status: "success",
      products: result,
      message: "products fetched",
    });
  } catch (error) {
    console.error("Failed to fetch products", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};
