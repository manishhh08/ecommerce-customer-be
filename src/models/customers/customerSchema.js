import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "superadmin"],
      default: "customer",
    },
    phone: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Customer", customerSchema);
