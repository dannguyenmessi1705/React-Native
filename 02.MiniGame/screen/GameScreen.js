import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import NumberGuest from "../components/game/NumberGuest";
import Tittle from "../components/ui/Tittle";

function getRandomNumber(start, end, initialNumber) {
  const rdnNum = Math.floor(Math.random() * (end - start)) + start;
  if (rdnNum === initialNumber) {
    return getRandomNumber(start, end, initialNumber);
  } else return rdnNum;
}

let minBoundary = 0;
let maxBoundary = 100;

function GameScreen({ initialNumber }) {
  const numberRdn = getRandomNumber(maxBoundary, maxBoundary, initialNumber);
  const [numberGuest, setNumberGuest] = useState(numberRdn);

  function handleButton(command) {
    if (
      (command === "lower" && numberGuest < initialNumber) ||
      (command === "greater" && numberGuest > initialNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (command === "lower") {
      maxBoundary = numberGuest;
    } else if (command === "greater") {
      minBoundary = numberGuest + 1;
    }
    const newNumber = getRandomNumber(minBoundary, maxBoundary, numberGuest);
    setNumberGuest(newNumber);
  }

  return (
    <View style={styles.screen}>
      <Tittle>Opponent's Guess</Tittle>
      <NumberGuest>{numberGuest}</NumberGuest>
      <View>
        <Text style={styles.guide}>Lower or Higher</Text>
      </View>
      <View>
        <PrimaryButton onPress={() => handleButton("lower")}>-</PrimaryButton>
        <PrimaryButton onPress={() => handleButton("greater")}>+</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 100,
  },
  guide: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
});

export default GameScreen;
