const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyD98Pu25ZzF1tU-HEiqxlBVtzPMmvFwSmY",
  authDomain: "jumomart-be41f.firebaseapp.com",
  projectId: "jumomart-be41f",
  storageBucket: "jumomart-be41f.appspot.com",
  messagingSenderId: "382169114244",
  appId: "1:382169114244:web:70ce3dfd647f72e9eac4d1"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);

// Export the initialized Firebase app and Firestore instance
module.exports = { firebaseapp, db };