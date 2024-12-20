const { badRequest } = require("../response/badRequest");
const paymentService = require("../services/dummyPayment");

const createPayment = async (req, res) => {
  try {
    const email = req.email;
    const { amount, currency, description } = req.body;
    if (!amount || !currency) {
      return res.status(400).json({
        error: "Amount and currency are required.",
        success: false,
      });
    }

    let payment = await paymentService.createPayment(
      amount,
      currency,
      description,
      email
    );

    payment = await paymentService.processPayment(payment?.paymentId);
    res.status(200).json({
      message: "Payment processed successfully.",
      data: payment,
      success: true,
    });
    // res.status(201).json({
    //   message: "Payment created successfully.",
    //   data: payment,
    //   success: true,
    // });
  } catch (error) {
    console.log("Error in creating payment : ", error);
    return res.status(500).json(badRequest());
  }
};

const processPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentService.processPayment(paymentId);
    res
      .status(200)
      .json({ message: "Payment processed successfully.", payment });
  } catch (error) {
    // next(error);
    return res.status(500).json(badRequest());
  }
};

const getPaymentDetails = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentService.getPaymentDetails(paymentId);
    res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json(badRequest());
  }
};

module.exports = { getPaymentDetails, createPayment, processPayment };
