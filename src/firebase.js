import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHxCUaPQmsehtgfN6RmYg2jNFR2VRlfHI",
  authDomain: "logojulio-2023.firebaseapp.com",
  projectId: "logojulio-2023",
  storageBucket: "logojulio-2023.appspot.com",
  messagingSenderId: "81537054765",
  appId: "1:81537054765:web:83535e76e2e3ca4d1c20a4",
  measurementId: "G-98DVCWMMXN",
};

const app = getApps().length ? getApps() : initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const firestore = getFirestore();

export { app, auth, storage, firestore };
