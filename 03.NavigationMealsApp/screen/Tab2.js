import { StyleSheet, View, Text, Button } from "react-native";

function Tab2({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

export default Tab2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
