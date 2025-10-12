import Category from "./categorySchema.js";

// get all categories with parent-child mapping
export const getAllCategories = async () => {
  const allCategories = await Category.find();

  // separate parents and children
  const parents = allCategories.filter((cat) => !cat.parent);
  const children = allCategories.filter((cat) => cat.parent);

  // attach children to their parent
  const structuredCategories = parents.map((parent) => ({
    ...parent._doc,
    subcategories: children.filter(
      (child) => String(child.parent) === String(parent._id)
    ),
  }));

  return structuredCategories;
};
