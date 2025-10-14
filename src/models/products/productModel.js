import { getDB } from "../../config/mongoConfig.js";
export const getProductsByFilter = async (filter, sort = {}, limit) => {
  const db = getDB();
  const products = await db.collection("products").find(filter).toArray();
  return products;
};
