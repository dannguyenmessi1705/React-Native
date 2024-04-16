import { Text, StyleSheet } from "react-native";
import Color from "../../constants/Color";
function InstructionText({ children, styleOverride }) {
  return <Text style={[styles.instruction, styleOverride]}>{children}</Text>;
  // Truyền vào style 1 mang chứa nhiều style, nếu có trùng thì style sau sẽ ghi đè lên style trước
}

const styles = StyleSheet.create({
  instruction: {
    fontSize: 24,
    color: Color.accent500,
  },
});
export default InstructionText;
