import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

import PrimaryButton from "../components/ui/PrimaryButton";
import NumberGuest from "../components/game/NumberGuest";
import Tittle from "../components/ui/Tittle";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuestLogItem from "../components/game/GuestLogItem";

function getRandomNumber(start, end, initialNumber) {
  const rdnNum = Math.floor(Math.random() * (end - start)) + start;
  if (rdnNum === initialNumber) {
    return getRandomNumber(start, end, initialNumber);
  } else return rdnNum;
}

let minBoundary = 0;
let maxBoundary = 100;

function GameScreen({ initialNumber, setGameOver, setGuestTimes }) {
  const numberRdn = getRandomNumber(0, 100, initialNumber);
  const [numberGuest, setNumberGuest] = useState(numberRdn);
  const [logGuess, setLogGuess] = useState([]);

  useEffect(() => {
    if (numberGuest === initialNumber) {
      setGuestTimes(logGuess.length + 1);
      setGameOver(true);
    }
    setLogGuess((prev) => [...prev, numberGuest]);
  }, [numberGuest, initialNumber, setGameOver, setLogGuess]);

  useEffect(() => {
    minBoundary = 0;
    maxBoundary = 100;
  }, []);

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
      <Card>
        <InstructionText styleOverride={styles.instruction}>
          Lower or Higher
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <PrimaryButton onPress={() => handleButton("lower")}>
              <Feather name="minus" size={24}></Feather>
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={() => handleButton("greater")}>
              <Feather name="plus" size={24}></Feather>
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        data={logGuess}
        keyExtractor={(data, index) => index}
        renderItem={(item) => (
          <GuestLogItem guestNumber={item.item} roundNumber={item.index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 100,
  },
  instruction: {
    fontSize: 24,
    color: "white",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});

export default GameScreen;
