import { View, Text, StyleSheet } from "react-native";
function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      {/* GUESS */}
      <View>
        <Text>Higher or Lower</Text>
      </View>
      {/* <View>+ -</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 38,
  },
});

export default GameScreen;
