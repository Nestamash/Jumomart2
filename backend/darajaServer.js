const axios = require("axios");
// Load environment variables from the .env file into process.env
require("dotenv").config()

// Setup express
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
  })
)
// generate token
async function getAccessToken(){
  let urlauth = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  let consumer_key = "3CGdapoaFt34VKU0AdNf5M3aOvANJsFz";
  let consumer_secret = "aIbPpARBc8jQzoyV"; 
  let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

  let auth1 = `Basic ${buffer.toString('base64')}`

 try {
    const response = await axios.get(urlauth, {
      headers: {
        Authorization: auth1,
      },
    });
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}

// token generated

  const shortCode = 174379;
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
 
// stk push
app.post("/api/stkpush", async (req, res) => {


  getAccessToken()
  .then((accessToken) => {
    console.log("😀 Your access token is: ", accessToken)
    // res.json({ message: "😀 Your access token is " + accessToken });
    const url =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + accessToken;
    const phoneNumber = 254729989466

    axios
        .post(
          url,
          {
            BusinessShortCode: "174379",
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: 1,
            PartyA: phoneNumber,
            PartyB: "174379",
            PhoneNumber: phoneNumber,
            CallBackURL: "https://249e-105-60-226-239.ngrok-free.app/api/callback",
            AccountReference: "Jumomart",
            TransactionDesc: "Mpesa Daraja API stk push test",
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          res.status(200).json({
            msg: "Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
            status: true,
          });

        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            msg: "Request failed",
            status: false,
          });
        });
    })
    .catch(console.log);
  })

// Start up our server on port 5000
app.listen(5000)