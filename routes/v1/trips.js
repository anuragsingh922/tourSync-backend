const express = require("express");
const router = express();

const { getallTrips } = require("../../controller/tripController.js");

router.get("/", getallTrips);

module.exports = router;