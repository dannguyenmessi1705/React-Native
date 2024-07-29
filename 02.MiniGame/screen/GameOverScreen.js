import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import Tittle from "../components/ui/Tittle.android";
import Color from "../constants/Color";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ guestTimes, initialNumber, startNewGame }) {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Tittle>GAME OVER</Tittle>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.text}>
          The phone needs <Text style={styles.highlight}>{guestTimes}</Text>{" "}
          time to guess the number{" "}
          <Text style={styles.highlight}>{initialNumber}</Text>
        </Text>
        <PrimaryButton onPress={startNewGame}>Start new game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
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
