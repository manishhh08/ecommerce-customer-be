import Product from "./productSchema.js";

export const getAllProductsQuery = (filter) => {
  return Product.find(filter);
};
