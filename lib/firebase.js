
import {initializeApp, getApps , getApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZxtHbQwXDx1UYe5OwiUf6f5HT73jYMQQ",
  authDomain: "olive-87721.firebaseapp.com",
  projectId: "olive-87721",
  storageBucket: "olive-87721.appspot.com",
  messagingSenderId: "187336114420",
  appId: "1:187336114420:web:58a4f356da6ea44d775ea1",
  measurementId: "G-BGWY27HQKJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
