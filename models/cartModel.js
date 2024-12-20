const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    tripID: {
      type: String,
      required: true,
      ref: "trip",
      unique : true
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("cart", CartSchema);
module.exports = User;
