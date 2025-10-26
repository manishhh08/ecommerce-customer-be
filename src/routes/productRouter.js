import express from "express";
import {
  fetchAllProducts,
  getFeaturedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.get("/featured-products", getFeaturedProducts);

export default router;
