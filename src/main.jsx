import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy4t9VUOXUpPm_U1hbez-oCEKavJETpcw",
  authDomain: "ether-easel.firebaseapp.com",
  projectId: "ether-easel",
  storageBucket: "ether-easel.appspot.com",
  messagingSenderId: "352288269762",
  appId: "1:352288269762:web:2504e7b790120af133a25b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
