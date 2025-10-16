import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    items: [orderItemSchema], // <-- array of items
    total: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "AUD",
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Order received", "Shipped", "Delivered"],
      default: "Order received",
    },
    orderedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
