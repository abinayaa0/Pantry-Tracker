// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCGdV1r41QsMtujAanDGNE9w93qO8BvVU",
  authDomain: "inventory-management-facb1.firebaseapp.com",
  projectId: "inventory-management-facb1",
  storageBucket: "inventory-management-facb1.appspot.com",
  messagingSenderId: "895359008110",
  appId: "1:895359008110:web:9cf4f3462c698be5be957f",
  measurementId: "G-ZSV18ZNDC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export{firestore};
// Firebase configuration 