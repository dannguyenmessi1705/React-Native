import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font"; // sử dụng font từ file font trong assets
import * as SplashScreen from "expo-splash-screen"; // Mặc định SplashScreen là 1 màn hình trắng

import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import GameOverScreen from "./screen/GameOverScreen";
import Color from "./constants/Color";

SplashScreen.preventAutoHideAsync(); // ngăn màn hình loading tự đóng khi tải xong
export default function App() {
  const [numberEntered, setNumberEntered] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [isLoadingFont, setIsLoadingFont] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // tải font từ file font trong assets
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch (error) {
        console.warn(error); // log lỗi nếu có
      } finally {
        setIsLoadingFont(true); // set isLoadingFont thành true
      }
    };
    prepare(); // gọi hàm prepare
  }, []);

  const handleFinishLoading = useCallback(async () => {
    if (isLoadingFont) {
      // kiểm tra nếu isLoadingFont là true
      await SplashScreen.hideAsync(); // ẩn màn hình loading
    }
  }, [isLoadingFont]); // thực hiện hàm này khi isLoadingFont thay đổi

  if (!isLoadingFont) {
    return null; // nếu isLoadingFont là false thì return null
  }

  return (
    <LinearGradient
      onLayout={handleFinishLoading} // thực hiện hàm handleFinishLoading khi layout được render
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
