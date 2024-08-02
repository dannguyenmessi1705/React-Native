import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({ message, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onPress}>OK</Button>
    </View>
  );
}

export default ErrorOverlay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
