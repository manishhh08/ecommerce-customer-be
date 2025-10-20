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

//code to be reviewed
export const getProductById = async (req, res) => {
  try {
    const upstream = `${ADMIN_API}/products/${req.params.id}`;
    const { data } = await axios.get(upstream, { timeout: 10000 });
    return res.status(200).json(data);
  } catch (err) {
    const message =
      err?.response?.data?.message || err.message || "Upstream error";
    return res.status(502).json({ status: "error", message });
  }
};

//recently added products not yet complete
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

export const getProductsBySubCategoryandCategory = async (
  categorySlug,
  subCategorySlug
) => {
  const db = getDB();
  const products = await db
    .collection("products")
    .aggregate([
      { $match: { subCategory: subCategorySlug } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      { $match: { "categoryDetails.slug": categorySlug } },
    ])
    .toArray();

  return products;
};
