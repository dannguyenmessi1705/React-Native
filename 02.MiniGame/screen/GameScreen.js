import { View, Text, StyleSheet } from "react-native";

import Tittle from "../components/Tittle";
function GameScreen() {
  return (
    <View style={styles.screen}>
      <Tittle>Opponent's Guess</Tittle>
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
    padding: 24,
    marginTop: 100,
  },
});

export default GameScreen;
