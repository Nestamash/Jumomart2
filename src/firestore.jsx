import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD98Pu25ZzF1tU-HEiqxlBVtzPMmvFwSmY",
  authDomain: "jumomart-be41f.firebaseapp.com",
  projectId: "jumomart-be41f",
  storageBucket: "jumomart-be41f.appspot.com",
  messagingSenderId: "382169114244",
  appId: "1:382169114244:web:70ce3dfd647f72e9eac4d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)