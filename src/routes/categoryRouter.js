import express from "express";
import {
  createCategory,
  fetchAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", fetchAllCategories);

export default router;
