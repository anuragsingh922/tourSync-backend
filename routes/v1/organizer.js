const express = require("express");
const router = express();

const {
  getOrganizerTrips,
  addOrganizerTrips,
  deleteTrip,
  updateTrip,
} = require("../../controller/organizerController.js");
const { fetchuser } = require("../../middleware/fetchUser.js");
router.use(fetchuser);

router.get("/", getOrganizerTrips);
router.post("/", addOrganizerTrips);
router.delete("/", deleteTrip);
router.put("/", updateTrip);

module.exports = router;
