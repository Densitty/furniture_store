// domain/.netlify/functions/create-payment-intent
require("dotenv").config();
// connect to stripe
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // console.log(event);
  /* when the url above is navigated to directly on client side, a get request is made, hence body property is not available on event. To save us from any error */
  if (event.body) {
    // parse the data obtained from FE to an object
    const { cart, shippingFee, tax, totalAmount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      // console.log(totalAmount + shippingFee + (totalAmount * tax) / 100);
      return Math.round(totalAmount + shippingFee + (totalAmount * tax) / 100);
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "ngn",
      });

      // console.log(paymentIntent);

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      // console.log(error); /* handy to get reason behind an error */
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
