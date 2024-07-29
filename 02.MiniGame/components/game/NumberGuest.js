import { View, Text, StyleSheet, Dimensions } from "react-native";

import Color from "../../constants/Color";
function NumberGuest({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textNumber}>{children}</Text>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderWidth: 4,
    borderColor: Color.accent500,
    borderRadius: 8,
  },
  textNumber: {
    color: Color.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NumberGuest;
