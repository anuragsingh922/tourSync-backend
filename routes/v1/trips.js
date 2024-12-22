const express = require("express");
const router = express();

const {
  getallTrips,
  getallTripDetails,
} = require("../../controller/tripController.js");

router.get("/", getallTrips);
router.get("/detail", getallTripDetails);

module.exports = router;
