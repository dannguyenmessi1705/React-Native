import { Text, StyleSheet } from "react-native";

import Color from "../../constants/Color";
function Tittle({ children }) {
  return <Text style={styles.tittle}>{children}</Text>;
}

const styles = StyleSheet.create({
  tittle: {
    fontSize: 24,
    color: 'white',
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default Tittle;
