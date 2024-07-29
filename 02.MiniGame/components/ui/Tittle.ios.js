import { Text, StyleSheet } from "react-native";

import Color from "../../constants/Color";
function Tittle({ children }) {
  return <Text style={styles.tittle}>{children} IOS</Text>;
}

const styles = StyleSheet.create({
  tittle: {
    fontSize: 24,
    color: "white",
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    borderColor: "white",
    borderWidth: 2,
    width: 300,
    maxWidth: "80%",
  },
});

export default Tittle;
