import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import axiosPublic from "../../utils/axiosPublic";

const constructUser = (user) => {
  return {
    displayName: user.displayName,
    email: user.email,
    createdAt: user.metadata.createdAt,
    lastLoginAt: user.metadata.lastLoginAt,
    photoURL: user.photoURL,
    uid: user.uid,
    accessToken: user.accessToken,
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        return axiosPublic
          .get("/user/isAdmin", {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then((res) => {
            setUser({ ...constructUser(user), isAdmin: res.data.isAdmin });
          })
          .catch(() => {
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (userCredentials) => {
    return updateProfile(auth.currentUser, userCredentials);
  };

  const signInViaGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const firebaseRefresh = () => {
    return auth.currentUser.getIdToken(true);
  };

  const authValue = {
    user,
    loading,
    setUser,
    createUser,
    updateUserProfile,
    signInUser,
    signInViaGoogle,
    signOutUser,
    firebaseRefresh,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
