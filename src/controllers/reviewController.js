import { newReview } from "../models/reviews/reviewModel.js";
import Review from "../models/reviews/reviewSchema.js";

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

// ✅ Get all active reviews for a single product
// export const getReviewsByProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     // Find all reviews for this product that are active
//     const reviews = await Review.find({
//       productId,
//       status: "active",
//     })
//       .select("title comment rating createdAt") // only include needed fields
//       .sort({ createdAt: -1 });

//     res.json({
//       status: "success",
//       data: reviews,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      productId,
      status: "active",
    })
      .populate("customerId", "fname lname") // ⬅️ add this
      .select("title comment rating createdAt customerId") // ⬅️ include customerId in output
      .sort({ createdAt: -1 });

    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
