import { getProductsByFilter } from "../models/products/productModel.js";
import { getMostPopularProducts } from "../models/orders/orderModel.js";
import { getDB } from "../config/mongoConfig.js";

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
// export const getProductById = async (req, res) => {
//   try {
//     const upstream = `${ADMIN_API}/products/${req.params.id}`;
//     const { data } = await axios.get(upstream, { timeout: 10000 });
//     return res.status(200).json(data);
//   } catch (err) {
//     const message =
//       err?.response?.data?.message || err.message || "Upstream error";
//     return res.status(502).json({ status: "error", message });
//   }
// };

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

export const getTopRatedProductsWithReviews = async (req, res) => {
  try {
    const db = getDB();

    const topProducts = await db
      .collection("products")
      .aggregate([
        { $match: { status: "active" } },
        { $limit: 10 },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "productId",
            as: "reviews",
          },
        },

        // Filter reviews with rating > 3
        {
          $addFields: {
            reviews: {
              $filter: {
                input: "$reviews",
                as: "rev",
                cond: { $gt: ["$$rev.rating", 3] },
              },
            },
          },
        },

        // Lookup customer for each review
        {
          $lookup: {
            from: "customers",
            localField: "reviews.customerId",
            foreignField: "_id",
            as: "customers",
          },
        },

        // Attach customer to each review
        {
          $addFields: {
            reviews: {
              $map: {
                input: "$reviews",
                as: "rev",
                in: {
                  _id: "$$rev._id",
                  title: "$$rev.title",
                  rating: "$$rev.rating",
                  comment: "$$rev.comment",
                  customer: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$customers",
                          as: "c",
                          cond: { $eq: ["$$c._id", "$$rev.customerId"] },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },

        { $project: { customers: 0 } },

        // Sort reviews by rating descending
        {
          $addFields: {
            reviews: {
              $slice: [
                { $sortArray: { input: "$reviews", sortBy: { rating: -1 } } },
                5,
              ],
            },
          },
        },
      ])
      .toArray();

    res.status(200).json({ status: "success", data: topProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
