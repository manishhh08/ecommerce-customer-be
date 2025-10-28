import express from "express";
import {
  createNewOrderController,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { createOrderValidation } from "../middleware/joiMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  createOrderValidation,
  authMiddleware,
  createNewOrderController
);
router.get("/", authMiddleware, getAllOrders); //gets all orders of a particular customer
router.get("/:id", authMiddleware, getOrderById); //gets an order by particular order id

export default router;
