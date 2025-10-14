import { fetchOrderByIdQuery, newOrder } from "../models/orders/orderModel.js";

export const createNewOrder = async () => {
  try {
    const payload = req.body;
    const order = await newOrder(payload);
    if (order) {
      return res
        .status(200)
        .json({ status: "success", message: "Order placed successfully" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllOrders = async () => {
  try {
    const { id } = req.query;
    const orders = await fetchOrderByIdQuery(id);
    if (orders) {
      return res
        .status(200)
        .json({ status: "success", message: "Orders fetched" }, orders);
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getOrderById = async () => {
  try {
    const { id } = req.params;
    const order = await fetchOrderByIdQuery(id);
    if (order) {
      return res
        .status(200)
        .json({ status: "success", message: "Order fetched" }, orders);
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
