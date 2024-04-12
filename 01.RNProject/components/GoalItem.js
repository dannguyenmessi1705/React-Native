import { View, Text, StyleSheet } from "react-native";

function GoalItem({ itemData }) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{itemData.item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    padding: 8,
    margin: 8,
    backgroundColor: "#5ea0cc",
    borderRadius: 6,
  },
});

export default GoalItem;
