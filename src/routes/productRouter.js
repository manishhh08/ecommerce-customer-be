import express from "express";
import {
  fetchAllProducts,
  getFeaturedProducts,
  getTopRatedProductsWithReviews,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/top-rated", getTopRatedProductsWithReviews);

export default router;
