import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9ZuzkPKMF0TS4DrDC3bp-5mitU_4QqsU",
  authDomain: "online-booking-system3.firebaseapp.com",
  databaseURL:
    "https://online-booking-system3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "online-booking-system3",
  storageBucket: "online-booking-system3.appspot.com",
  messagingSenderId: "296912516543",
  appId: "1:296912516543:web:eafb1c8625eb1277f25d0a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default firebase;
