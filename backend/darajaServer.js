const axios = require("axios");

const { addDoc, collection, getDocs, deleteDoc } = require('firebase/firestore');
const { firebaseapp, db } = require('./firebaseConfig');

// Load environment variables from the .env file into process.env
require("dotenv").config();

// Setup express
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());


app.use(
  cors({
    //allow all origins using the wildcard *
    origin: '*',
  })
);
const originURL = "http://localhost:5000";
// Generate token
async function getAccessToken() {
  let urlauth = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let consumer_key = "zeJJTIXVJQOGEdA1YgScW59pcwl6RGNi";
  let consumer_secret = "KpfMPpfavz3JRvwz";
  let buffer = Buffer.from(consumer_key + ":" + consumer_secret);

  let auth1 = `Basic ${buffer.toString('base64')}`;

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
const password = Buffer.from(shortCode + passkey + timestamp).toString(
  "base64"
);

// stk push
app.post("/api/stkpush", async (req, res) => {
  const { phoneNumber, amount } = req.body;
  const tillNumber = '174379';
 // clear firestore before adding notification
     // clear firestore after adding notification
     await axios.post(`${originURL}/api/clear-stk-callbacks`);
     
  try {
    const accessToken = await getAccessToken();
    console.log("😀 Your access token is: ", accessToken);

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + accessToken;

    const response = await axios.post(
      url,
      {
        BusinessShortCode: tillNumber,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: tillNumber,
        PhoneNumber: phoneNumber,
        CallBackURL: "https://8f1a-102-219-210-86.ngrok-free.app/api/callback",
        AccountReference: "Jumomart",
        TransactionDesc: "Mpesa Daraja API stk push test",
      },
      {
        headers: {
          Authorization: auth,
        },
      }
    );

    // console.log(response);
    res.status(200).json({
      msg: "Mpesa pop-up has been sent to your phone ✔✔. Please enter mpesa pin to complete the transaction",
      status: true,
    });

   
    

  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Request failed",
      status: false,
    });
  }
});

// callBack Notification
// Handle delayed notifications from Safaricom
app.post("/api/callback", async (req, res) => {
  // Log the received notification

   console.log("STK PUSH CALLBACK");
  const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  const resultCode = req.body.Body.stkCallback.ResultCode;
  const resultDesc = req.body.Body.stkCallback.ResultDesc;

  console.log("MerchantRequestID:", merchantRequestID);
  console.log("CheckoutRequestID:", checkoutRequestID);
  console.log("ResultCode:", resultCode);
  console.log("ResultDesc:", resultDesc); 
  

   // Store ResultDesc in Firebase Firestore
   try {
    const resultRef = await addDoc(collection(db, "stkCallbacks"), {
      merchantRequestID,
      checkoutRequestID,
      resultCode,
      resultDesc,
    }); 

    console.log("Document written with ID: ", resultRef.id);

  } catch (e) {
    console.error("Error adding document: ", e);
  }


  // Send a success response to Safaricom
  res.status(200).json();
});



// Clear stkCallbacks
app.post("/api/clear-stk-callbacks", async (req, res) => {
  try {
    const stkCallbacksCollection = collection(db, "stkCallbacks");
    const stkCallbacksSnapshot = await getDocs(stkCallbacksCollection);

    // Delete all documents in stkCallbacks collection
    const deletePromises = stkCallbacksSnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("stkCallbacks collection cleared");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error clearing stkCallbacks collection:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start up our server on port 5000
app.listen(5000);
