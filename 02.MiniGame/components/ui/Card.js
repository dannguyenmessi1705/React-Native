import { View, Text, StyleSheet } from "react-native";
import Color from "../../constants/Color";
function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    backgroundColor: Color.primary800,
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    // Android Shadow
    elevation: 4,
    // iOS Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
});

export default Card;
