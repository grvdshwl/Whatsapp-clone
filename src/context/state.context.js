import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const StateContext = createContext({
  user: {},
  authLoading: false,
});

export const StateContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        const data = {
          photo: userAuth.photoURL,
          name: userAuth.auth.currentUser.displayName,
          id: userAuth.uid,
          email: userAuth.auth.currentUser.email,
        };
        setCurrentUser(data);
        setIsLoading(false);
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const context = {
    user: currentUser,
    authLoading: isLoading,
  };

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};
