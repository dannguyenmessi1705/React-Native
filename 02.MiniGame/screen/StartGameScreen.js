import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Color from "../constants/Color";
import Tittle from "../components/ui/Tittle.android";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ setStartGame }) {
  const [numberEntered, setNumberEntered] = useState("");

  const { width, height } = useWindowDimensions(); // Lấy ra kích thước của màn hình

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

  const marginTop = height < 380 ? 30 : 100; // Nếu chiều cao màn hình nhỏ hơn 380 (ngang) thì marginTop = 30, và ngược lại với màn hình dọc

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Tittle>Guest My Number</Tittle>
          <Card>
            <InstructionText>Enter the Number</InstructionText>
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
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
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
