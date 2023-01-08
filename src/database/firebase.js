import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAm8vjt3pjrcrg6pI4QFNOlsTWHg0bk29s",
  authDomain: "ntut-web-d95c1.firebaseapp.com",
  databaseURL:
    "https://ntut-web-d95c1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ntut-web-d95c1",
  storageBucket: "ntut-web-d95c1.appspot.com",
  messagingSenderId: "601478556525",
  appId: "1:601478556525:web:9a898b3a3cb8f9b71cc864",
  measurementId: "G-PZ2X170SYG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default firebase;
