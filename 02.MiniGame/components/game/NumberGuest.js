import { View, Text, StyleSheet } from "react-native";

import Color from "../../constants/Color";
function NumberGuest({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textNumber}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    margin: 24,
    borderWidth: 4,
    borderColor: Color.accent500,
    borderRadius: 8,
  },
  textNumber: {
    color: Color.accent500,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NumberGuest;
