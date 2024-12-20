const express = require("express");
const router = express();

const {
  getCartTrips,
  addCartTrips,
  deleteTrip,
  clearCart,
} = require("../../controller/cartController.js");
const { fetchuser } = require("../../middleware/fetchUser.js");

router.use(fetchuser);

router.get("/", getCartTrips);
router.post("/", addCartTrips);
router.delete("/", deleteTrip);
router.delete("/clear", clearCart);

module.exports = router;
