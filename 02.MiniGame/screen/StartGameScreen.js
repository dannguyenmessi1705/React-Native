import { View, TextInput, StyleSheet } from "react-native";

import PrimaryButton from "../components/PrimaryButton";
function StartGameScreen() {
  return (
    <View style={styles.inputContainre}>
      <TextInput />
      <PrimaryButton>Reset</PrimaryButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainre: {
    backgroundColor: '#72063c',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    // Android Shadow
    elevation: 4,
    // iOS Shadow
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1

  },
});

export default StartGameScreen;
