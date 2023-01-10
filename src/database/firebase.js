import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDbNtAemE1FfSuIiqecs3obaHH3ZwRQAM",
  authDomain: "online-booking-system-754dc.firebaseapp.com",
  projectId: "online-booking-system-754dc",
  storageBucket: "online-booking-system-754dc.appspot.com",
  messagingSenderId: "335041191531",
  appId: "1:335041191531:web:211b158c5fbde1967c9b2e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default firebase;
