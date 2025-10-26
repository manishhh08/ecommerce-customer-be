import { newReview } from "../models/reviews/reviewModel.js";

// ===== CREATE A REVIEW =====
export const createReview = async (req, res) => {
  try {
    const { productId, title, rating, comment } = req.body;
    const customerId = req.user._id; // from auth middleware

    if (!title || !rating || !comment) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields required" });
    }
    const review = await newReview({
      productId,
      customerId,
      title,
      rating,
      comment,
    });

    res.status(200).json({
      status: "success",
      message: "Review added successfully",
      data: review,
    });
    console.log("review object", review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ===== FETCH ALL REVIEWS (ADMIN OR PRIVATE) =====
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("productId", "name")
      .populate("customerId", "name email");
    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ===== FETCH PUBLIC REVIEWS (FOR PRODUCTS PAGE) =====
export const getPublicReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("productId", "name");
    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
