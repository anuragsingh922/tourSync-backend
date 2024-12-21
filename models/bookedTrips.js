const mongoose = require("mongoose");

const BookedTripsSchema = new mongoose.Schema(
  {
    tripID: {
      type: String,
      required: true,
    },
    email: {
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
      required: true,
    },
    images: {
      type: Array,
    },
    tripCreatedAt: {
      type: Date,
      required: true,
    },
    tripUpdatedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const bookedTripsModel = new mongoose.model("bookedtrips", BookedTripsSchema);
module.exports = bookedTripsModel;
