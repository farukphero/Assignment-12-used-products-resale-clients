import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserByEmail=(email, password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const accountLogIn=(email, password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }
  const providerGoogleLogIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    // localStorage.removeItem('token')
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUserByEmail,
    accountLogIn,
    logOut,
    providerGoogleLogIn,
    // updateName,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;