import Category from "./categorySchema.js";

// get all categories
export const getAllCategories = () => {
  return Category.find();
};

//create new category
export const insertCategory = (categoryObj) => {
  return Category.create(categoryObj);
};
