// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAirOQi9DAP8Zz_07qvj5Rc8WxMSerU_ek",
  authDomain: "student-crud-c94bd.firebaseapp.com",
  projectId: "student-crud-c94bd",
  storageBucket: "student-crud-c94bd.firebasestorage.app",
  messagingSenderId: "545512186583",
  appId: "1:545512186583:web:28cd9d93e837b33f010692",
  measurementId: "G-8G5Q5ELJW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);