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
