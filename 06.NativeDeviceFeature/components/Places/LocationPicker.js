import { View, StyleSheet, Text, Image } from "react-native";
import {
  getCurrentPositionAsync, // Lấy vị trí hiện tại của thiết bị
  useForegroundPermissions, // Hook trả về status, request quyền truy cập vị trí
  PermissionStatus, // Status của quyền truy cập vị trí
} from "expo-location";
import { useState, useEffect } from "react";
import {
  useNavigation, // Hook điều hướng
  useRoute, // Hook lấy thông tin route
  useIsFocused, // Hook kiểm tra xem màn hình có đang focus hay không
} from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { getAddress, getMapPreview } from "../../util/location";

function LocationPicker({ pickLocationHandler }) {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState({ lat: "", lng: "" }); // State chứa vị trí đã chọn
  const [permissionStatus, requestPermission] = useForegroundPermissions();

  const route = useRoute(); // Lấy thông tin route
  const isFocused = useIsFocused(); // Kiểm tra xem màn hình có đang focus hay không
  useEffect(() => {
    if (isFocused && route.params) {
      // Nếu màn hình đang được focus và có params từ màn hình khác truyền vào
      setPickedLocation({
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      }); // Lưu vị trí đã
    }
  }, [isFocused, route]);

  useEffect(() => {
    // async function getAddressHandler() {
    //   if (!pickedLocation.lat || !pickedLocation.lng) {
    //     return;
    //   }
    //   const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
    //   pickLocationHandler({ ...pickedLocation, address: address });
    // }
    // try {
    //   getAddressHandler();
    // } catch (error) {
    //   pickLocationHandler({
    //     lat: pickedLocation.lat,
    //     lng: pickedLocation.lng,
    //     address: "No address found",
    //   });
    // }
    if (!pickedLocation.lat || !pickedLocation.lng) {
      return;
    }
    pickLocationHandler({ ...pickedLocation, address: "No address found" });
  }, [pickedLocation, pickLocationHandler]); // Hàm convert vị trí đã chọn thành địa chỉ (dùng API của Google)

  async function isVerifyPermission() {
    if (permissionStatus !== PermissionStatus.GRANTED) {
      // Nếu chưa được cấp quyền
      const response = await requestPermission(); // Yêu cầu cấp quyền
      return response.status; // Trả về status của quyền truy cập vị trí
    }
    if (permissionStatus === PermissionStatus.DENIED) {
      // Nếu bị từ chối
      return false; // Trả về false
    }
    return true; // Ngược lại trả về true
  }

  async function getLocationHandler() {
    const isPermission = await isVerifyPermission(); // Kiểm tra quyền truy cập vị trí
    if (!isPermission) {
      // Nếu không được cấp quyền
      return; // Thoát
    }
    const location = await getCurrentPositionAsync(); // Lấy vị trí hiện tại của thiết bị
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    }); // Lưu vị trí đã chọn
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>; // Mặc định hiển thị thông báo "No location picked yet."

  if (pickedLocation.lat && pickedLocation.lng) {
    // Nếu đã chọn vị trí
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    ); // Hiển thị ảnh vị trí đã chọn (dựa vào lat, lng) bằng hàm getMapPreview sử dụng Google Static Maps API
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 4
  },
});
