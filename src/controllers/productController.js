import axios from "axios";
import { getProductsByFilter } from "../models/products/productModel.js";
import { getMostPopularProducts } from "../models/orders/orderModel.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await getProductsByFilter({ status: "active" });

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

//recently added products not yet completeg
export const getFeaturedProducts = async (req, res) => {
  try {
    const recentlyAddedProducts = await getProductsByFilter(
      { status: "active" },
      { createdAt: -1 },
      4
    );
    const bestSellerFinder = async () => {
      const mostSold = await getMostPopularProducts({});
      const mostSoldIds = mostSold.map((item) => item._id);
      if (!mostSold) return null;
      const products = await getProductsByFilter({ _id: { $in: mostSoldIds } });
      if (!products) return null;
      return products;
    };
    const bestSellerProducts = await bestSellerFinder();
    if (!recentlyAddedProducts || !bestSellerProducts)
      return res
        .status(500)
        .json({ status: "error", message: "No product found" });
    return res.status(200).json({
      status: "success",
      recentlyAddedProducts,
      bestSellerProducts,
      message: "Featured products fetched",
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};
