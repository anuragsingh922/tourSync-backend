const express = require("express");
const { fetchuser } = require("../../middleware/fetchUser");
const router = express();

const {getallBookedTrips , addBookedTrips , deleteBookedTrip} = require("../../controller/bookedTripController");


router.use(fetchuser);


router.get("/" , getallBookedTrips);
router.post("/" , addBookedTrips);
router.delete("/" , deleteBookedTrip);

module.exports = router;