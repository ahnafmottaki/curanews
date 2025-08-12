import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: {},
  loading: true,
  setUser() {},
  createUser() {},
  updateUserProfile() {},
  signInUser() {},
  signInViaGoogle() {},
  signOutUser() {},
  firebaseRefresh() {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
export { useAuth };
