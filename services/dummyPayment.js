const PaymentModel = require("../models/payment");
const { v4: uuidv4 } = require("uuid");

class DummyPaymentService {
  async createPayment(amount, currency, description, email) {
    const payment = new PaymentModel({
      paymentId: uuidv4(),
      amount,
      currency,
      description,
      email,
    });
    await payment.save();
    return payment;
  }

  async processPayment(paymentId) {
    const payment = await PaymentModel.findOne({ paymentId });
    if (!payment) throw new Error("Payment not found.");

    const isSuccess = Math.random() > 0.2; // 80% chance of success
    payment.status = isSuccess ? "success" : "failed";
    payment.processedAt = new Date();
    await payment.save();

    return payment;
  }

  async getPaymentDetails(paymentId) {
    const payment = await PaymentModel.findOne({ paymentId });
    if (!payment) throw new Error("Payment not found.");
    return payment;
  }
}

module.exports = new DummyPaymentService();
