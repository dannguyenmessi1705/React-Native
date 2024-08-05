import { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
function Map({ navigation, route }) {
  const initialWhenMoveFromPlaceDetails = route.params ?? route.params; // Lấy vị trí đã chọn từ màn hình PlaceDetails nếu có
  const region = {
    latitude: initialWhenMoveFromPlaceDetails?.lat ?? 20.8703537, // Vĩ độ
    longitude: initialWhenMoveFromPlaceDetails?.lng ?? 106.0837406, // Kinh độ
    latitudeDelta: 0.0922, // Vùng hiển thị theo chiều dọc, độ chênh lệch giữa vĩ độ tối đa và tối thiểu
    longitudeDelta: 0.0421, // Vùng hiển thị theo chiều ngang, độ chênh lệch giữa kinh độ tối đa và tối thiểu
  }; // Vùng hiển thị ban đầu của bản đồ

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  }); // State chứa vị trí đã chọn

  const selectMapHandler = (event) => {
    if (
      initialWhenMoveFromPlaceDetails?.lat &&
      initialWhenMoveFromPlaceDetails?.lng
    )
      return;

    setLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!location.latitude || !location.longitude) {
      Alert.alert("No location picked!", "Please pick a location first.");
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: location.latitude,
      pickedLng: location.longitude,
    }); // Chuyển đến màn hình AddPlace và truyền vị trí đã chọn (Lưu ý, màn hình AddPlace do đã được render trước đó nên phải dùng useIsFocused() để được render lại)
  }, [navigation, location]); // Lưu vị trí đã chọn, sử dụng useCallback để tránh việc render lại 1 function lặp đi lặp lại

  useLayoutEffect(() => {
    if (initialWhenMoveFromPlaceDetails) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <IconButton
            color={tintColor}
            icon="save"
            size={24}
            onPress={savePickedLocationHandler}
          />
        );
      },
    });
  }, [navigation, savePickedLocationHandler, initialWhenMoveFromPlaceDetails]); // Thêm nút save vào header của bản đồ

  return (
    <MapView
      initialRegion={region} // Vùng hiển thị ban đầu của bản đồ
      style={styles.map} // Style của bản đồ
      onPress={(event) => selectMapHandler(event)} // Sự kiện khi click vào bản đồ (lấy vị trí) sau khi click
    >
      {(initialWhenMoveFromPlaceDetails?.lat &&
        initialWhenMoveFromPlaceDetails?.lng) ||
      (location.latitude && location.longitude) ? (
        // Nếu đã chọn vị trí thì hiển thị marker
        <Marker
          title="Picked Location" // Tiêu đề của marker
          coordinate={{
            latitude: initialWhenMoveFromPlaceDetails?.lat ?? location.latitude, // Vĩ độ
            longitude:
              initialWhenMoveFromPlaceDetails?.lng ?? location.longitude, // Kinh độ
          }} // Vị trí của marker
        />
      ) : null}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
