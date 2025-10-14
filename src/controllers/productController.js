import axios from "axios";
import { getAllActiveProducts } from "../models/products/productModel.js";

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await getAllActiveProducts();

        return res.status(200).json({
            status: "success",
            products,
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch products",
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const upstream = `${ADMIN_API}/products/${req.params.id}`;
        const { data } = await axios.get(upstream, { timeout: 10000 });
        return res.status(200).json(data);
    } catch (err) {
        const message = err?.response?.data?.message || err.message || "Upstream error";
        return res.status(502).json({ status: "error", message });
    }
};
