import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtc_wYyOeEhTC9RSf2dxjjdtqjrK0LypQ",
  authDomain: "sakurasushi-48db5.firebaseapp.com",
  projectId: "sakurasushi-48db5",
  storageBucket: "sakurasushi-48db5.firebasestorage.app",
  messagingSenderId: "219246954525",
  appId: "1:219246954525:web:630dad144a35a67c0c1ef4",
  measurementId: "G-PLQCDD1TSW"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
