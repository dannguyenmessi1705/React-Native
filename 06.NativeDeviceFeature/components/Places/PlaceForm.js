import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  const takeImageHandler = useCallback((imageUri) => {
    setSelectedImage(imageUri);
  }, []); // Lưu ảnh đã chọn, vì có thể chọn lại ảnh nhiều lần nên dùng useCallback để tránh việc render lại 1 function lặp đi lặp lại

  const pickLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []); // Lưu vị trí đã chọn, vì có thể chọn lại vị trí nhiều lần nên dùng useCallback để tránh việc render lại 1 function lặp đi lặp lại

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation);
    onCreatePlace(placeData);
  } // Hàm lưu địa điểm

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker pickLocationHandler={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
