const bookedTripsModel = require("../models/bookedTrips");
const { badRequest } = require("../response/badRequest");

const getallBookedTrips = async (req, res) => {
  try {
    const userEmail = req?.email;
    if (!userEmail) return res.status(500).json(badRequest());
    const bookedTrips = await bookedTripsModel
      .find({ email: userEmail })
      .populate("tripID");
    if (!bookedTrips) return res.status(500).json(badRequest());
    return res.status(200).json({
      message: "Booked Trips.",
      success: true,
      data: bookedTrips,
    });
  } catch (error) {
    console.error("Error in getallBookedTrips : ", error);
    return res.status(400).json(badRequest());
  }
};

const addBookedTrips = async (req, res) => {
  try {
    const tripDetails = req.body;
    const email = req?.email;

    if (!Array.isArray(tripDetails)) {
      return res.status(400).json({ message: "tripIDs must be an array" });
    }

    const tripDocuments = tripDetails.map((tripID) => ({
      tripID: tripID?.tripID,
      email,
    }));

    const trips = await bookedTripsModel.insertMany(tripDocuments);

    if (!trips) {
      return res.status(200).json(badRequest());
    }

    const allTrips = await bookedTripsModel
      .find({ email }, { email: 0 })
      .populate("tripID");

    return res.status(200).json({
      message: "Trips booked successfully",
      success: true,
      data: allTrips,
    });
  } catch (error) {
    console.error("Error in booking trips: ", error);
    return res.status(500).json(badRequest());
  }
};

module.exports = { getallBookedTrips, addBookedTrips };
