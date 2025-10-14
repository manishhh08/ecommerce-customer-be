import { getDB } from "../../config/mongoConfig.js";

export const getAllActiveProducts = async () => {
  const db = getDB();
  const products = await db
    .collection("products")
    .find({ status: "active" })
    .toArray();
  return products;
};
