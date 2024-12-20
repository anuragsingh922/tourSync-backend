const express = require("express");
const {
  createPayment,
  processPayment,
  getPaymentDetails,
} = require("../../controller/paymentController");
const { fetchuser } = require("../../middleware/fetchUser");

const router = express.Router();

router.use(fetchuser);
// router.use(errorHandler);

router.post("/create-payment", createPayment);
router.post("/process/:paymentId", processPayment);
router.get("/:paymentId", getPaymentDetails);

module.exports = router;
