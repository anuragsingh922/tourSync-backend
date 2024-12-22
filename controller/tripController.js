const Trip = require("../models/tripModel.js");
const { badRequest } = require("../response/badRequest.js");

const getallTrips = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ updatedAt: -1 });
    return res.status(200).json({
      message: "All trips",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error in geting all trips : ", error);
    return res.status(500).json(badRequest());
  }
};
const getallTripDetails = async (req, res) => {
  try {
    const { tripID } = req.query;
    const trips = await Trip.findOne({ tripID } , {organizerEmail : 0});
    return res.status(200).json({
      message: "All trips",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error in geting all trips : ", error);
    return res.status(500).json(badRequest());
  }
};

const deleteTrip = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Organizer trips",
      data: [],
      success: true,
    });
  } catch (error) {
    console.error("Error in organizer delete trip : ", error);
  }
};

module.exports = { getallTrips, deleteTrip, getallTripDetails };
