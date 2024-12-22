const Cart = require("../models/cartModel");
const Trip = require("../models/tripModel.js");
const { badRequest } = require("../response/badRequest.js");
const { v4 } = require("uuid");

const getOrganizerTrips = async (req, res) => {
  try {
    const email = req.email;

    const trips = await Trip.find(
      { organizerEmail: email },
      { organizerEmail: 0 }
    ).sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Trips in the cart",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error in fetching cart trips: ", error);
    return res.status(500).json(badRequest());
  }
};
const addOrganizerTrips = async (req, res) => {
  try {
    const tripDetails = req.body;

    const newitem = new Cart({
      tripID: tripDetails?.tripID,
      email: req?.email,
    });

    const trip = await newitem.save();
    if (!trip) {
      return res.status(200).json(badRequest());
    }

    const tripID = trip?.tripID;

    const tripDetail = await Trip.findOne(
      { tripID },
      { email: 0, organizerEmail: 0 }
    );

    return res.status(200).json({
      message: "Trips in the cart",
      success: true,
      data: tripDetail,
    });
  } catch (error) {
    console.error("Error in fetching cart trips: ", error);
    return res.status(500).json(badRequest());
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { tripID } = req.query;

    if (!tripID) {
      return res.status(400).json({
        message: "Trip ID is required.",
        success: false,
      });
    }

    // Correcting the method name and ensuring the ID is properly passed
    const trip = await Trip.findOneAndDelete({ tripID: tripID });
    await Cart.findOneAndDelete({ tripID: tripID });

    const trips = await Trip.find(
      { organizerEmail: req?.email },
      { organizerEmail: 0 }
    ).sort({ updatedAt: -1 });

    if (!trip) {
      return res.status(400).json({
        message: "Trip not found.",
        success: false,
        data: trips,
      });
    }

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

const updateTrip = async (req, res) => {
  try {
    const email = req.email;

    const {
      tripName,
      description,
      price,
      startingTime,
      endingTime,
      slots,
      location,
      groupSize,
      duration,
      tripID,
      accommodations,
      tripImage,
      galleryCategories,
    } = req.body;

    if (
      !tripName ||
      !description ||
      !price ||
      !startingTime ||
      !endingTime ||
      !slots
    ) {
      return res.status(400).json({
        message: "Please provide all the details",
        success: false,
        data: [],
      });
    }

    const data = {
      tripName: tripName,
      tripImage,
      description: description,
      price: price,
      startingTime: startingTime,
      endingTime: endingTime,
      slots: slots,
      organizerEmail: email,
      accommodations,
      galleryCategories,
      location,
      groupSize,
      duration,
    };

    await Trip.findOneAndUpdate({ tripID }, { $set: data });
    const trips = await Trip.find(
      { organizerEmail: email },
      { organizerEmail: 0 }
    ).sort({ updatedAt: -1 });
    if (!trips) {
      return res.status(400).json(badRequest());
    }

    return res.status(200).json({
      message: "Updated Trips",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error in Update Trip : ", error);
    return res.status(500).json(badRequest());
  }
};

const addtrip = async (req, res) => {
  try {
    const email = req.email;

    const {
      tripName,
      description,
      price,
      startingTime,
      endingTime,
      location,
      groupSize,
      duration,
      slots,
      accommodations,
      galleryCategories,
      tripImage
    } = req.body;

    // Validate required fields
    if (
      !tripName ||
      !description ||
      !price ||
      !startingTime ||
      !endingTime ||
      !location ||
      !groupSize ||
      !duration ||
      !slots ||
      !duration ||
      !tripImage
    ) {
      return res.status(400).json({
        message: "Please provide all the required details",
        success: false,
        data: "",
      });
    }

    // Create data object
    const data = {
      tripID: v4(),
      tripName,
      description,
      tripImage,
      price,
      startingTime,
      endingTime,
      location,
      groupSize,
      duration,
      slots,
      accommodations: accommodations || [],
      galleryCategories: galleryCategories || [],
      organizerEmail: email,
    };

    // Save new trip
    const newTrip = new Trip(data);
    await newTrip.save();

    // Fetch trips for the organizer
    const trips = await Trip.find(
      { organizerEmail: email },
      { organizerEmail: 0 } // Exclude the organizerEmail field from the response
    ).sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Trip added successfully.",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error in adding trip:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: "",
    });
  }
};

module.exports = {
  getOrganizerTrips,
  addOrganizerTrips,
  deleteTrip,
  updateTrip,
  addtrip,
};
