import Review from "./reviewSchema.js";

export const newReview = (reviewObject) => {
  return Review.create(reviewObject);
};

export const previousReview = (reviewObj) => {
  return Review.findOne(reviewObj);
};
