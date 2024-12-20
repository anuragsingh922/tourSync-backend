const Cart = require("../models/cartModel");
const { badRequest } = require("../response/badRequest.js");

const getCartTrips = async (req, res) => {
  try {
    const email = req.email;

    const trips = await Cart.find({ email }, { email: 0 }).populate("tripID");

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
const addCartTrips = async (req, res) => {
  try {
    const tripDetails = req.body;
    const email = req?.email;

    const newitem = new Cart({
      tripID: tripDetails?.tripID,
      email: req?.email,
    });

    const trip = await newitem.save();
    if (!trip) {
      return res.status(200).json(badRequest());
    }

    const trips = await Cart.find({ email }, { email: 0 }).populate("tripID");

    return res.status(200).json({
      message: "Trips in the cart",
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error in adding cart trips: ", error);
    return res.status(500).json(badRequest());
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { tripID } = req.query;
    console.log("ID : ", tripID);
    const email = req?.email;

    if (!tripID) {
      return res.status(400).json({
        message: "Trip ID is required.",
        success: false,
      });
    }

    // Correcting the method name and ensuring the ID is properly passed
    const trip = await Cart.findByIdAndDelete({ _id: tripID.toString() });

    if (!trip) {
      return res.status(400).json({
        message: "Trip not found.",
        success: false,
      });
    }
    const trips = await Cart.find({ email }, { email: 0 }).populate("tripID");

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
const clearCart = async (req, res) => {
  try {
    const email = req?.email;
    const trip = await Cart.deleteMany({
      email: email,
    });

    if (!trip) {
      return res.status(400).json({
        message: "Trip not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All trips deleted successfully.",
      success: true,
      data: [],
    });
  } catch (error) {
    console.error("Error deleting the trip: ", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

module.exports = { getCartTrips, addCartTrips, deleteTrip, clearCart };
