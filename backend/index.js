
// Load environment variables from the .env file into process.env
require("dotenv").config()

// Setup express
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
     //allow all origins using the wildcard *
     origin: '*',
  })
)
// Setup Stripe h
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
       
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image_url]
            },
            unit_amount: item.price*100,
          },
          quantity: item.quantity,
          
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
// console.log(`server started on port 3000`);
// Start up our server on port 3000
app.listen(3000)