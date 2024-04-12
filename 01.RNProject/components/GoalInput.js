import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

function GoalInput({ handleAddCourse }) {
  const [courseGoal, setCourseGoal] = useState(""); // Khởi tạo giá trị rỗng cho biến courseGoal

  // Hàm xử lý khi người dùng nhập text vào input
  const handleTextInput = (textEntered) => {
    setCourseGoal(textEntered);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal"
        onChangeText={handleTextInput}
        value={courseGoal}
      />
      {/* Tạo input, trong RN sẽ là self close tag */}
      <Button
        title="Add course"
        onPress={() => {
          handleAddCourse(courseGoal);
          setCourseGoal("");
        }}
      />
      {/* Tạo button, trong RN sẽ là self close tag, Button trong RN sẽ không có thẻ style */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    margin: 8,
    padding: 8,
  },
});

export default GoalInput;
