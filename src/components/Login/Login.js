import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../firebase/firebase";
import "./Login.css";
const Login = () => {
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__image" />
        <h2>Sign in to WhatsApp</h2>
        <div className="login__button" onClick={handleSignIn}>
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
