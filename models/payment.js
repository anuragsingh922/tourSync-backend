const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    description: { type: String },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    processedAt: { type: Date },
  },
  { timestamps: true }
);

const PaymentModel = new mongoose.model("Payment", PaymentSchema);
module.exports = PaymentModel;
