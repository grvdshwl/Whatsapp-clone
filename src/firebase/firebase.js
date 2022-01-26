import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { db, auth, provider };
