import { useState } from "react";
import { Alert } from "react-native";

import { login } from "../util/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../context/AuthContext";

function LoginScreen() {
  const authContext = useAuth();
  const [isLogin, setLogin] = useState(false);

  async function onAuthenticate({ email, password }) {
    try {
      setLogin(true);
      const token = await login(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setLogin(false);
    }
  }

  if (isLogin) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={onAuthenticate} />;
}

export default LoginScreen;
