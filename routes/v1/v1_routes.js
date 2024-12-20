const express = require("express");
const router = express();

const auth_routes = require("./auth");
const trips_routes = require("./trips");
const cart_routes = require("./cart");
const organizer_routes = require("./organizer");
const booked_trips_routes = require("./bookedTrips");
const payment_routes = require("./payment");

router.use("/auth", auth_routes);
router.use("/trips", trips_routes);
router.use("/cart", cart_routes);
router.use("/organizer", organizer_routes);
router.use("/booked-trips", booked_trips_routes);
router.use("/payments", payment_routes);

module.exports = router;
