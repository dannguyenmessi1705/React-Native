import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";

export default function App() {
  const [numberEntered, setNumberEntered] = useState();

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.container}>
      <ImageBackground
        source={require("./assets/images/background.png")} // ImageBackground source
        style={styles.container} // ImageBackground style
        resizeMode="cover" // imageResizeMode
        imageStyle={styles.image} // imageStyle cho ảnh nền
      >
        {numberEntered ? (
          <GameScreen />
        ) : (
          <StartGameScreen setStartGame={setNumberEntered} />
        )}
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
