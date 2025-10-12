import express from "express";
import { retrieveAllCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", retrieveAllCategories);

export default router;
