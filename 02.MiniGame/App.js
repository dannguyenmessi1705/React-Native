import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import GameOverScreen from "./screen/GameOverScreen";
import Color from "./constants/Color";

export default function App() {
  const [numberEntered, setNumberEntered] = useState();
  const [gameOver, setGameOver] = useState(false);

  return (
    <LinearGradient
      colors={[Color.primary700, Color.accent500]}
      style={styles.container}
    >
      <ImageBackground
        source={require("./assets/images/background.png")} // ImageBackground source
        style={styles.container} // ImageBackground style
        resizeMode="cover" // imageResizeMode
        imageStyle={styles.image} // imageStyle cho ảnh nền
      >
        <SafeAreaView style={styles.container}>
          {gameOver ? (
            <GameOverScreen />
          ) : numberEntered ? (
            <GameScreen
              initialNumber={numberEntered}
              setGameOver={setGameOver}
            />
          ) : (
            <StartGameScreen setStartGame={setNumberEntered} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    opacity: 0.15,
  },
});
