import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Color from "../constants/Color";
function StartGameScreen({ setStartGame }) {
  const [numberEntered, setNumberEntered] = useState("");

  const handleNumberInput = (input) => {
    setNumberEntered(input);
  };

  const handleReset = () => {
    setNumberEntered("");
  };

  const handleConfirm = () => {
    const number = parseInt(numberEntered);
    if (isNaN(number) || number <= 0 || number > 99) {
      // Kiểm tra nếu number không phải là số hoặc nhỏ hơn 0 hoặc lớn hơn 99 thì hiển thị thông báo
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: handleReset },
      ]); // Hiển thị thông báo với nội dung "Invalid Number!" và "Number has to be between 1 and 99." và button "Okay" với style "destructive" và onPress là hàm handleReset
      return;
    }
    setStartGame(number); // Gọi hàm setStartGame với tham số là number
  };
  return (
    <View style={styles.inputContainre}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="numeric"
        value={numberEntered}
        onChangeText={handleNumberInput}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <PrimaryButton onPress={handleReset}>Reset</PrimaryButton>
        </View>
        <View style={styles.button}>
          <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainre: {
    alignItems: "center",
    backgroundColor: Color.primary800,
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    // Android Shadow
    elevation: 4,
    // iOS Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: Color.accent500,
    borderBottomWidth: 2,
    borderBottomColor: Color.accent500,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});

export default StartGameScreen;
