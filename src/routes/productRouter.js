import express from "express";
import {
  fetchAllProducts,
  getFeaturedProducts,
  getProductsBySubCategoryandCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/:categorySlug/:subCategorySlug", async (req, res) => {
  try {
    const { categorySlug, subCategorySlug } = req.params;
    const products = await getProductsBySubCategoryandCategory(
      categorySlug,
      subCategorySlug
    );
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
