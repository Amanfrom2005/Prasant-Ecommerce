// backend/models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🔹 Stripe (if you still want to keep old orders safe)
    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true, // avoid duplicate index error if not always filled
    },

    // 🔹 Razorpay
    razorpayOrderId: {
      type: String,
      required: false,
    },
    razorpayPaymentId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
