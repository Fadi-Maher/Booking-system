// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqSz-4ReapV0YhX-qy0_arqrYW7rlK69g",
  authDomain: "reservemate-74770.firebaseapp.com",
  databaseURL: "https://reservemate-74770-default-rtdb.firebaseio.com",
  projectId: "reservemate-74770",
  storageBucket: "reservemate-74770.appspot.com",
  messagingSenderId: "413530914869",
  appId: "1:413530914869:web:81c9bee00e416b2ea0f17c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
