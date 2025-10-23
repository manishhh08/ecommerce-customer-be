import { getDB } from "../../config/mongoConfig.js";

export const getAllCategories = async () => {
  const db = getDB();
  const categories = await db
    .collection("categories")
    .find({ parent: null })
    .toArray();
  return categories;
};

export const getAllSubCategories = async () => {
  const db = getDB();
  const categories = await db
    .collection("categories")
    .find({ parent: { $ne: null } })
    .toArray();
  return categories;
};

export const getProductDetails = async (filter) => {
  const db = getDB();
  const products = await db
    .collection("categories")
    .aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      { $replaceRoot: { newRoot: "$productDetails" } },
    ])
    .toArray();
  return products;
};
