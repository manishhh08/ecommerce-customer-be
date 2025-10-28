import mongoose from "mongoose";
import { updateOrder } from "../models/orders/orderModel.js";
import { newReview, previousReview } from "../models/reviews/reviewModel.js";
import Review from "../models/reviews/reviewSchema.js";

// ===== CREATE A REVIEW =====
export const createReview = async (req, res) => {
  try {
    const { productId, title, rating, comment, orderId } = req.body;
    console.log("pid", productId);
    const customerId = req.user._id;
    if (!productId || !title || !rating || !comment || !orderId) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields required" });
    }
    // const mongooseId = (id) => new mongoose.Types.ObjectId(id);

    // const existingReview = await previousReview({
    //   productId: new mongoose.Types.ObjectId(productId),
    //   customerId: new mongoose.Types.ObjectId(customerId),
    //   orderId: new mongoose.Types.ObjectId(orderId),
    // });

    const reviewObj = {
      customerId: new mongoose.Types.ObjectId(customerId),
      productId: new mongoose.Types.ObjectId(productId),
      orderId: new mongoose.Types.ObjectId(orderId),
      title,
      rating,
      comment,
    };

    const existingReview = await previousReview({
      customerId: reviewObj.customerId,
      productId: reviewObj.productId,
      orderId: reviewObj.orderId,
    });

    if (existingReview) {
      return res.status(400).json({
        status: "error",
        message: "You have already reviewed this product for this order.",
      });
    }
    const review = await newReview(reviewObj);

    const updatedOrder = await updateOrder(
      {
        _id: new mongoose.Types.ObjectId(orderId),
        "items.productId": new mongoose.Types.ObjectId(productId),
      },
      {
        $set: {
          "items.$.isReviewed": true,
          "items.$.reviewId": review._id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Review added successfully",
      data: review,
    });
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
