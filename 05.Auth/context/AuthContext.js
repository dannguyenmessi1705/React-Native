import { createContext, useContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContext = createContext({
  token: "",
  isAuthenticate: false,
  authenticate: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  const authenticate = (token) => {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
    setAuthToken("");
  };

  const store = {
    token: authToken,
    isAuthenticate: !!authToken,
    authenticate,
    logout,
  };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Component isnot in AuthContextProvider");
  }
  return context;
};
