import {
  fetchOrderByFilterQuery,
  newOrder,
} from "../models/orders/orderModel.js";

export const createNewOrder = async (req, res) => {
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

export const getAllOrders = async (req, res) => {
  try {
    const { id } = req.query;
    const orders = await fetchOrderByFilterQuery({ customerId: id });
    if (orders) {
      return res
        .status(200)
        .json({ status: "success", message: "Orders fetched", orders });
    }
    return res.status(404).json({ status: "error", message: "Not found" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
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
