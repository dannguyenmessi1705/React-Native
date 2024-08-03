const KEY = "AIzaSyAbdZ6we0YucdGaRq9Y44YllS6ZxYimE1g";
const URL = "https://identitytoolkit.googleapis.com/v1/accounts";

import axios from "axios";

const authentication = async (mode, email, password) => {
  const res = await axios.post(`${URL}:${mode}?key=${KEY}`, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = res.data.idToken;
  return token;
};

export const signup = (email, password) => {
  return authentication("signUp", email, password);
};

export const login = (email, password) => {
  return authentication("signInWithPassword", email, password);
};
