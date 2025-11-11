import { getDB } from "../../config/mongoConfig.js";
export const getProductsByFilter = async (filter, sort, limit) => {
  const db = getDB();
  let query = await db.collection("products").find(filter);

  if (sort && Object.keys(sort).length > 0) {
    query = query.sort(sort);
  }

  if (limit && Number.isInteger(limit) && limit > 0) {
    query = query.limit(limit);
  }

  const products = await query.toArray();
  return products;
};
