// domain/.netlify/functions/welcome

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: "Welcome to using Netlify to serve Stripe checkout functionalities",
  };
};

const express = require("express");
const app = express();
// This is a sample test API key.
const stripe = require("stripe")(process.env.REACT_STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
