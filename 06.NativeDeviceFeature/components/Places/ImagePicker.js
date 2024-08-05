import { View, Text, StyleSheet, Image } from "react-native";
import {
  launchCameraAsync, // Hàm mở camera và chụp ảnh
  useCameraPermissions, // Hook trả về 2 thông tin: status (trạng thái quyền truy cập camera) và request (hàm yêu cầu quyền truy cập camera)
  PermissionStatus, // Hàm chứa thông tin về quyền truy cập camera (có thể là 'granted', 'denied', 'undetermined')
} from "expo-image-picker";
import { useState } from "react";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [image, setImage] = useState(null); // State chứa ảnh đã chụp
  const [cameraPermission, requestCameraPermission] = useCameraPermissions(); // Lấy thông tin quyền truy cập camera

  async function hasVerifyCameraPermission() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      // Nếu quyền truy cập camera chưa được xác định
      const response = await requestCameraPermission(); // Yêu cầu quyền truy cập camera

      return response.granted; // Trả về kết quả xác định quyền truy cập camera (true hoặc false)
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      // Nếu quyền truy cập camera bị từ chối
      return false; // Trả về false
    }

    return true; // Ngược lại Trả về true nếu quyền truy cập camera đã được cấp
  }

  async function takeImageHandler() {
    if (!(await hasVerifyCameraPermission())) {
      // Nếu quyền truy cập camera bị từ chối
      return; // Thoát khỏi hàm
    }
    const imagePicker = await launchCameraAsync({
      allowsEditing: true, // Cho phép chỉnh sửa ảnh
      aspect: [16, 9], // Tỉ lệ ảnh (16:9)
      quality: 0.7, // Chất lượng ảnh (70%)
    }); // Mở camera và chụp ảnh

    setImage(imagePicker.assets[0].uri); // Lưu uri ảnh đã chụp vào state image
    onTakeImage(imagePicker.assets[0].uri); // Truyền uri ảnh đã chụp vào hàm takeImageHandler
  }

  let imagePreview = <Text>No image picked yet.</Text>; // Mặc định hiển thị thông báo "No image picked yet."

  if (image) {
    // Nếu đã chụp ảnh
    imagePreview = <Image source={{ uri: image }} style={styles.image} />; // Hiển thị ảnh đã chụp
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
