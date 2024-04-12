import { View, Text, StyleSheet, Pressable } from "react-native";

function GoalItem({ itemData , handleDeleteCourse}) {
  return (
    <Pressable onPress={() => handleDeleteCourse(itemData.item.id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{itemData.item.text}</Text>
      </View>
    </Pressable>
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
