import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [courseGoal, setCourseGoal] = useState("");
  const handleTextInput = (textEntered) => {
    setCourseGoal(textEntered);
  };
  const handleAddCourse = () => {
    console.log(courseGoal);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          onChangeText={handleTextInput}
        />
        {/* Tạo input, trong RN sẽ là self close tag */}
        <Button title="Add course" onPress={handleAddCourse} />
        {/* Tạo button, trong RN sẽ là self close tag, Button trong RN sẽ không có thẻ style */}
      </View>
      <View style={styles.contentContainer}>
        <Text>List of courses...{courseGoal}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
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
  contentContainer: {
    flex: 4,
  },
});
// Tạo style cho từng attribute
