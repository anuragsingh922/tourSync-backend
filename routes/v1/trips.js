const express = require("express");
const router = express();

const {
  getallTrips,
  addtrip,
} = require("../../controller/tripController.js");
const { fetchuser } = require("../../middleware/fetchUser.js");

router.get("/", getallTrips);
router.post("/", fetchuser , addtrip);

module.exports = router;
