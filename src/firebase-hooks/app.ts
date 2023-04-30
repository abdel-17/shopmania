import { initializeApp } from "firebase/app";

// The app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzhEzSTIy3esDoe0erHdDvKo6d8hU1oyI",
  authDomain: "shopmania-fcds.firebaseapp.com",
  projectId: "shopmania-fcds",
  storageBucket: "shopmania-fcds.appspot.com",
  messagingSenderId: "997383328329",
  appId: "1:997383328329:web:7eebafbbb988e17be22598",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
