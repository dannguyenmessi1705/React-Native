import { View, Text, StyleSheet, Image } from "react-native";

import Tittle from "../components/ui/Tittle";
import Color from "../constants/Color";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ guestTimes, initialNumber, startNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Tittle>GAME OVER</Tittle>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.text}>
        The phone needs <Text style={styles.highlight}>{guestTimes}</Text> time
        to guess the number{" "}
        <Text style={styles.highlight}>{initialNumber}</Text>
      </Text>
      <PrimaryButton onPress={startNewGame}>Start new game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Color.primary800,
    overflow: "hidden",
    marginVertical: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontFamily: "open-sans",
    marginVertical: 24,
    textAlign: "center",
  },
  highlight: {
    color: Color.primary500,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
