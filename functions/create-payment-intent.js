// domain/.netlify/functions/create-payment-intent
require('dotenv').config();

// This is your test secret API key.
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
    if (event.body) {
        const { cart, total_amount, shipping_fee } = JSON.parse(event.body)

        const calculateOrderAmount = () => {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            // in production  u will have to map cart item and get the real cost of each item and return the total
            return total_amount + shipping_fee;
        };

        try {

            // Create a PaymentIntent with the order amount and currency
            // this is where we connect to stripe

            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            // response to StripeCheckout axious.post
            return {
                statusCode: 200,
                body: JSON.stringify({ client_secret: paymentIntent.client_secret })
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message })
            }
        }

    }

    else {
        return {
            statusCode: 200,
            body: " create payment intent"
        }

    }
}