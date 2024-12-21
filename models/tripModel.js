const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    tripID: {
      type: String,
      required: true,
    },
    tripName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    startingTime: {
      type: Date,
      required: true,
    },
    organizerEmail: {
      type: String,
      required: true,
    },
    endingTime: {
      type: Date,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    slots: {
      type: Array,
      required: true,
    },
    cancellationPolicy: {
      type: Array,
      default: [{ 15: 100, 7: 50, 0: 0 }],
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("trip", TripSchema);
module.exports = User;
