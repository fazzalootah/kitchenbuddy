// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcZ58sIPr6O62F1Sr-ZD78JJCistFVmEM",
  authDomain: "kitchenbuddy-8f3d6.firebaseapp.com",
  databaseURL: "https://kitchenbuddy-8f3d6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kitchenbuddy-8f3d6",
  storageBucket: "kitchenbuddy-8f3d6.appspot.com",
  messagingSenderId: "110427336682",
  appId: "1:110427336682:web:0d02d1eebe0b9e9bc1cc93",
  measurementId: "G-G5551E4HGB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}