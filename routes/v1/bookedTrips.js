const express = require("express");
const { fetchuser } = require("../../middleware/fetchUser");
const router = express();

const {getallBookedTrips , addBookedTrips} = require("../../controller/bookedTripController");


router.use(fetchuser);


router.get("/" , getallBookedTrips);
router.post("/" , addBookedTrips);

module.exports = router;