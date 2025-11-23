// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ9qqLz6IYoWrs4rV-aG-Fb2w_QF8yvJw",
  authDomain: "matiasapk.firebaseapp.com",
  projectId: "matiasapk",
  storageBucket: "matiasapk.firebasestorage.app",
  messagingSenderId: "868299362958",
  appId: "1:868299362958:web:86824013b941c730c02fdf",
  measurementId: "G-FG6C732DD4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
