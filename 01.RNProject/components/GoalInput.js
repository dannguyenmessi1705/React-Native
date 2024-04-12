import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import { useState } from "react";

function GoalInput({ handleAddCourse, showModal, handleHideModal }) {
  const [courseGoal, setCourseGoal] = useState(""); // Khởi tạo giá trị rỗng cho biến courseGoal

  // Hàm xử lý khi người dùng nhập text vào input
  const handleTextInput = (textEntered) => {
    setCourseGoal(textEntered);
  };

  return (
    <Modal visible={showModal} animationType="slide">
      {/* Tạo Modal, visible để hiển thị hoặc ẩn Modal, animationType để thiết lập kiểu hiệu ứng khi hiển thị Modal */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          onChangeText={handleTextInput}
          value={courseGoal}
        />
        {/* Tạo input, trong RN sẽ là self close tag */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add goal"
              onPress={() => {
                handleAddCourse(courseGoal);
                setCourseGoal("");
              }}
            />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={handleHideModal} />
          </View>
        </View>

        {/* Tạo button, trong RN sẽ là self close tag, Button trong RN sẽ không có thẻ style */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 24,
    padding: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    margin: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginTop: 16,
    width: 100,
    marginHorizontal: 8,
  },
});

export default GoalInput;
