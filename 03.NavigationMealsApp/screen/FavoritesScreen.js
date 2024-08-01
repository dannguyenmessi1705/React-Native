import { Button, StyleSheet, Text, View } from "react-native";

function FavoritesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

export default FavoritesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
