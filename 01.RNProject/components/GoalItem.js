import { View, Text, StyleSheet, Pressable } from "react-native";

function GoalItem({ itemData, handleDeleteCourse }) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={() => handleDeleteCourse(itemData.item.id)}
        style={({ pressed }) => pressed && styles.pressItem} // Khi người dùng ấn vào item, sẽ thay đổi style của item
      >
        <Text style={styles.goalText}>{itemData.item.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    backgroundColor: "#5ea0cc",
    borderRadius: 6,
  },
  goalText: {
    padding: 8,
    color: "#fff",
  },
  pressItem: {
    opacity: 0.5,
  },
});

export default GoalItem;
