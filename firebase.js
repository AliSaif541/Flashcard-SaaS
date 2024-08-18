// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1F7bq3mXLEVhcKoxGrdgdVNOgKlQ2SN4",
  authDomain: "flashcard-saas-bc83a.firebaseapp.com",
  projectId: "flashcard-saas-bc83a",
  storageBucket: "flashcard-saas-bc83a.appspot.com",
  messagingSenderId: "105496269990",
  appId: "1:105496269990:web:4d0eb9a7d3afd1f7579067",
  measurementId: "G-K3GVVD92HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};