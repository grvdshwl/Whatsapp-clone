import firebase from "firebase";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEu16_0ibkM26XkL-IkQB-zEjXG1Dif_s",
  authDomain: "whatsapp-clone-11dd2.firebaseapp.com",
  projectId: "whatsapp-clone-11dd2",
  storageBucket: "whatsapp-clone-11dd2.appspot.com",
  messagingSenderId: "592279573010",
  appId: "1:592279573010:web:85a2a07fcadee14cf5fecb",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
