import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

function WelcomeScreen() {
  const authContext = useAuth();

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
