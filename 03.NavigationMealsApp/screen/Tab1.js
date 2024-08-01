import { StyleSheet, View, Text } from "react-native";

function Tab1() {
  return (
    <View style={styles.container}>
      <Text>Tab1</Text>
    </View>
  );
}

export default Tab1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
