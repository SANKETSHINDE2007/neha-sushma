// js/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual config from the Firebase console!

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXIcLe6rY5fPncWvOVd3eL_frWFoNzWfE",
  authDomain: "e-library-a8257.firebaseapp.com",
  projectId: "e-library-a8257",
  storageBucket: "e-library-a8257.firebasestorage.app",
  messagingSenderId: "134403467709",
  appId: "1:134403467709:web:5111a895cf2ea0c9b40ad4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);