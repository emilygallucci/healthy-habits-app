// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe-bf3uwjSbtoXsHYAPyPfLqFDL0zaIEc",
  authDomain: "healthy-habits-app-ee3a8.firebaseapp.com",
  projectId: "healthy-habits-app-ee3a8",
  storageBucket: "healthy-habits-app-ee3a8.firebasestorage.app",
  messagingSenderId: "541112955661",
  appId: "1:541112955661:web:849d5cebca10e66bb0f644",
  measurementId: "G-MHJWT9PSYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);