import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your name" />
        {/* Tạo input, trong RN sẽ là self close tag */}
        <Button title="Add text" />
        {/* Tạo button, trong RN sẽ là self close tag */}
      </View>
      <Text>List of app...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    margin: 8,
    padding: 8,
  },
});
// Tạo style cho từng attribute
