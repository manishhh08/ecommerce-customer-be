import Product from "./productSchema.js";

export const addProduct = (productObj) => {
  console.log("inside query func addproduct");
  console.log(111, productObj);
  return Product.create(productObj);
};

export const getAllProductsQuery = () => {
  return Product.find();
};

export const updateProductQuery = (id, updateObj) => {
  return Product.findByIdAndUpdate(id, updateObj);
};

export const deleteProductQuery = (id) => {
  return Product.findByIdAndDelete(id);
};
