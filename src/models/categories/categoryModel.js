import { getDB } from "../../config/mongoConfig.js";

export const getAllCategories = async () => {
  const db = getDB();
  const categories = await db
    .collection("categories")
    .find({ parent: null })
    .toArray();
  console.log(343, categories);
  return categories;
};

export const getAllSubCategories = async () => {
  const db = getDB();
  const categories = await db
    .collection("categories")
    .find({ parent: { $ne: null } })
    .toArray();
  console.log(34, categories);
  return categories;
};
