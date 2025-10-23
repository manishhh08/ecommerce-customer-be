import express from "express";
import {
  fetchCategoryProducts,
  retrieveAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", retrieveAllCategories);
router.get("/:slug", fetchCategoryProducts);

export default router;
