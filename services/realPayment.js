const stripe = require("stripe")("your-stripe-secret-key");

class RealPaymentService {
  async createPayment(amount, currency, description) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      description,
    });

    return {
      paymentId: paymentIntent.id,
      amount,
      currency,
      description,
      status: "pending",
    };
  }

  async processPayment(paymentId) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (!paymentIntent) throw new Error("Payment not found.");

    const status = paymentIntent.status === "succeeded" ? "success" : "failed";
    return { paymentId, status };
  }

  async getPaymentDetails(paymentId) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (!paymentIntent) throw new Error("Payment not found.");

    return {
      paymentId,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }
}

module.exports = new RealPaymentService();
