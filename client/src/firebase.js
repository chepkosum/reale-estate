// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reale-estate-4cebf.firebaseapp.com",
  projectId: "reale-estate-4cebf",
  storageBucket: "reale-estate-4cebf.appspot.com",
  messagingSenderId: "282667279658",
  appId: "1:282667279658:web:16a3a31b822ccff15c6a53"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);