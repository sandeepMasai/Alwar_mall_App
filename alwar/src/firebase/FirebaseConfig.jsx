// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAkwyKp__j9dR6aO3-26wmbaFKuTVqE47Q",
  authDomain: "alwarmall.firebaseapp.com",
  projectId: "alwarmall",
  storageBucket: "alwarmall.appspot.com",
  messagingSenderId: "316347674568",
  appId: "1:316347674568:web:606eab32b23ea626489afd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB =getFirestore(app);
const auth =getAuth(app);


export {fireDB, auth}

