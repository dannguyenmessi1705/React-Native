import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dummyText}>Hello World</Text>
      </View>
      <Text style={styles.dummyText}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Start" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dummyText: {
    borderWidth: 2,
    borderColor: "red",
    margin: 16,
    padding: 16,
  }
}); // Tạo style cho từng attribute
