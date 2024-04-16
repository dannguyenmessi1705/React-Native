import { Text, StyleSheet } from "react-native";

import Color from "../constants/Color";
function Tittle({ children }) {
  return <Text style={styles.tittle}>{children}</Text>;
}

const styles = StyleSheet.create({
  tittle: {
    fontSize: 24,
    color: Color.accent500,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    borderColor: Color.accent500,
    borderWidth: 2,
  },
});

export default Tittle;
