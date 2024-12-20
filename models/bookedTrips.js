const mongoose = require("mongoose");

const BookedTripsSchema = new mongoose.Schema(
  {
    tripID: {
      type: String,
      required: true,
      ref: "trip",
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookedTripsModel = new mongoose.model("bookedtrips", BookedTripsSchema);
module.exports = bookedTripsModel;
