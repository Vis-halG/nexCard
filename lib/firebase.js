import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFSqYPS2AG4ljN2YXRyWwEV3-DvpS6q0U",
  authDomain: "flexcard-ff8ec.firebaseapp.com",
  projectId: "flexcard-ff8ec",
  storageBucket: "flexcard-ff8ec.firebasestorage.app",
  messagingSenderId: "447761555985",
  appId: "1:447761555985:web:633893f8ef93a7168507b0",
  measurementId: "G-9Z08JQF600"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);