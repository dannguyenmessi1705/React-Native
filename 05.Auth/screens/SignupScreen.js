import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { signup } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../context/AuthContext";

function SignupScreen() {
  const authContext = useAuth();
  const [isSigningUp, setSigningUp] = useState(false);

  async function onAuthenticate({ email, password }) {
    try {
      setSigningUp(true);
      const token = await signup(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setSigningUp(false);
    }
  }

  if (isSigningUp) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={onAuthenticate} />;
}

export default SignupScreen;
