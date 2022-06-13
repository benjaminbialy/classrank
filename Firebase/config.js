// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz2SH2kofgE9edum6eSR_g_MUZAh-sNGQ",
  authDomain: "classrankmate.firebaseapp.com",
  projectId: "classrankmate",
  storageBucket: "classrankmate.appspot.com",
  messagingSenderId: "1014948427964",
  appId: "1:1014948427964:web:9ce2ca818c2d0eed4138b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export { app, database };
