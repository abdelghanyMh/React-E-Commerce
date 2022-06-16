// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
    console.log(event);
    const { cart, total_amount, shipping_fee } = JSON.parse(event.body)

    if (event.body) {
        return {
            statusCode: 200,
            body: JSON.stringify(cart)
        }

    } else {
        return {
            statusCode: 200,
            body: " create payment intent"
        }

    }
}