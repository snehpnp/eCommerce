import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0nY94wxzFdLrJHsP56DP32iX3eWqcGzk",
  authDomain: "socialauth-534b5.firebaseapp.com",
  projectId: "socialauth-534b5",
  storageBucket: "socialauth-534b5.firebasestorage.app",
  messagingSenderId: "194683114049",
  appId: "1:194683114049:web:609e8961b989fc18e32cc0",
  measurementId: "G-MQVJ0BVZ31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
