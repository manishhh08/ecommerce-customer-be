import axios from "axios";

const ADMIN_API = (process.env.MONGODB_URL || "http://localhost:4000/api/v1").replace(/\/$/, "");

// GET /api/v1/products  -> defaults to status=active
export const getAllProducts = async (req, res) => {
    try {
        const params = new URLSearchParams(req.query);
        if (!params.has("status")) params.set("status", "active");

        const upstream = `${ADMIN_API}/products?${params.toString()}`;
        const { data } = await axios.get(upstream, { timeout: 10000 });

        return res.status(200).json(data);
    } catch (err) {
        const message = err?.response?.data?.message || err.message || "Upstream error";
        return res.status(502).json({ status: "error", message });
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
