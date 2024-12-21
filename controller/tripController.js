const Trip = require("../models/tripModel.js");
const { v4 } = require("uuid");
const { badRequest } = require("../response/badRequest.js");

const getallTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
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

const addtrip = async (req, res) => {
  try {
    const email = req.email;

    const {
      tripName,
      description,
      price,
      startingTime,
      endingTime,
      slots,
      cancellationPolicy,
    } = req.body;

    console.log(req.body);

    if (
      !tripName ||
      !description ||
      !price ||
      !startingTime ||
      !endingTime ||
      !slots ||
      !cancellationPolicy ||
      cancellationPolicy.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide all the details",
        success: false,
        data: "",
      });
    }

    const data = {
      tripID: v4(),
      tripName: tripName,
      description: description,
      price: price,
      startingTime: startingTime,
      endingTime: endingTime,
      slots: slots,
      organizerEmail: email,
      cancellationPolicy: cancellationPolicy,
    };

    const newTrip = new Trip(data);

    const newTripedSaved = await newTrip.save();

    return res.status(200).json({
      message: "Trip Added successfully.",
      success: true,
      data: newTripedSaved,
    });
  } catch (error) {
    console.error("Error in adding trip : ", error);
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

module.exports = { getallTrips, addtrip, deleteTrip };
