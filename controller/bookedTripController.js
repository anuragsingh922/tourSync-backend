const bookedTripsModel = require("../models/bookedTrips");
const Trips = require("../models/tripModel");
const { badRequest } = require("../response/badRequest");

const getallBookedTrips = async (req, res) => {
  try {
    const userEmail = req?.email;
    if (!userEmail) return res.status(500).json(badRequest());
    const bookedTrips = await bookedTripsModel
      .find({ email: userEmail })
      .sort({ updatedAt: -1 });
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

    if (tripDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No trips found for the given tripIDs" });
    }

    // Step 4: Prepare the documents to insert into the bookedTrips collection
    const tripDocuments = tripDetails.map((trip) => ({
      tripID: trip.tripID.tripID,
      email,
      tripName: trip.tripID.tripName || "",
      tripImage : trip.tripID.tripImage || "",
      description: trip.tripID.description || "",
      startingTime: trip.tripID.startingTime,
      endingTime: trip.tripID.endingTime,
      price: trip.tripID.price,
      slots: trip.tripID.slots,
      organizerEmail: trip.tripID.organizerEmail,
      tripCreatedAt: trip.tripID.createdAt,
      tripUpdatedAt: trip.tripID.updatedAt,
      location: trip.tripID.location,
      duration: trip.tripID.duration,
      accommodations: trip.tripID.accommodations || [],
      galleryCategories: trip.tripID.galleryCategories || [],
      groupSize : trip.tripID.groupSize
    }));

    const trips = await bookedTripsModel.insertMany(tripDocuments);

    if (!trips) {
      return res.status(200).json(badRequest());
    }

    const allTrips = await bookedTripsModel
      .find({ email }, { email: 0 })
      .populate("tripID")
      .sort({ updatedAt: -1 });

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

const deleteBookedTrip = async (req, res) => {
  try {
    const { tripID } = req.query;
    const email = req?.email;

    if (!tripID) {
      return res.status(400).json({
        message: "Trip ID is required.",
        success: false,
      });
    }

    // Correcting the method name and ensuring the ID is properly passed
    const trip = await bookedTripsModel.findByIdAndDelete({
      _id: tripID.toString(),
    });

    if (!trip) {
      return res.status(400).json({
        message: "Trip not found.",
        success: false,
      });
    }
    const trips = await bookedTripsModel.find({ email }, { email: 0 }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      message: "Trip deleted successfully.",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error deleting the trip: ", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

module.exports = { getallBookedTrips, addBookedTrips, deleteBookedTrip };
