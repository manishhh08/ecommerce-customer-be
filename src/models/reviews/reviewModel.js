import Review from "./reviewSchema.js";

export const newReview = (reviewObject) => {
  return Review.create(reviewObject);
};
