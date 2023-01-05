// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAm8vjt3pjrcrg6pI4QFNOlsTWHg0bk29s",
    authDomain: "ntut-web-d95c1.firebaseapp.com",
    databaseURL: "https://ntut-web-d95c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ntut-web-d95c1",
    storageBucket: "ntut-web-d95c1.appspot.com",
    messagingSenderId: "601478556525",
    appId: "1:601478556525:web:9a898b3a3cb8f9b71cc864",
    measurementId: "G-PZ2X170SYG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;