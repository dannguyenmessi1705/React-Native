import { View, StyleSheet } from "react-native";
import {
  getCurrentPositionAsync, // Lấy vị trí hiện tại của thiết bị
  useForegroundPermissions, // Hook trả về status, request quyền truy cập vị trí
  PermissionStatus, // Status của quyền truy cập vị trí
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function LocationPicker() {
  const [permissionStatus, requestPermission] = useForegroundPermissions();

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
    console.log(location); // Hiển thị thông tin vị trí
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
