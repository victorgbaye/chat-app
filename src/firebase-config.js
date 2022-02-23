import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAw80isXveA6LJckP1gfMK--sN3ElvvQls",
  authDomain: "chat-app-a9a6a.firebaseapp.com",
  projectId: "chat-app-a9a6a",
  storageBucket: "chat-app-a9a6a.appspot.com",
  messagingSenderId: "6433924797",
  appId: "1:6433924797:web:545f552e9cc3d9e65bf9d4",
  measurementId: "G-HBCPS2110E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
