import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Notifications from "expo-notifications";
import { useEffect } from "react"

async function requestPermissionsForNotification() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: "true", // Cho phép hiện thông báo
      allowBadge: "true", // Cho phép hiện số thông báo
      allowSound: "true", // Cho phép phát âm thanh
      allowAnnouncements: "true" // Cho phép hiện thông báo ở màn hình khóa
    } // IOS Phải cấu hình thêm ở đây
  }) // Hàm này mỗi khi chạy nếu chưa cấp quyền sẽ hiện thông báo cấp quyền, mặc định Android khi chạy hàm này sẽ hiện thông báo cấp quyền
} // Hàm này mỗi khi chạy nếu chưa cấp quyền sẽ hiện thông báo cấp quyền

Notifications.setNotificationHandler({
  handleNotification: async (notify) => {
    return {
      shouldShowAlert: true, // Hiện thông báo
      shouldPlaySound: true, // Phát âm thanh
      shouldSetBadge: true // Hiện số thông báo
    }
  }
}); // Hàm này sẽ xử lý thông báo khi thông báo đến

async function setNotificationChannel() {
  await Notifications.setNotificationChannelAsync("test", {
    name: "Notification Channel", // Tên channel
    importance: Notifications.AndroidImportance.HIGH, // Mức độ quan trọng
    enableVibrate: true, // Cho phép rung
    vibrationPattern: [0, 250, 250, 250], // Chuỗi rung [delay, rung, delay, rung, ...]
    lightColor: "#FF231F7C", // Màu sáng khi có thông báo
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC, // Hiển thị thông báo ở màn hình khóa
    // sound: "notification.wav" // Âm thanh thông báo (KHÔNG NÊN SỬ DỤNG)
  }) // Chỉ dành cho Android
} // Hàm này sẽ tạo channel cho Android >= 8 để hiện thông báo, có có thể có nhiều channel (Android >= 8)

export default function App() {
  async function handleButtonClickReceiveNotification() {
    await Notifications.scheduleNotificationAsync({ // Hàm này sẽ lên lịch hiện thông báo sau khi trigger bật lên
      content: {
        title: "Local Notification", // Tiêu đề thông báo
        body: "This is a local notification", // Nội dung thông báo
        // sound: "notification.wav" // Chỉ dành cho Android <= 8 (KHÔNG NÊN SỬ DỤNG)
      },
      trigger: {
        seconds: 2, // Thời gian sau bao lâu sẽ hiện thông báo sau khi trigger bật lên
        channelId: "test", // Chỉ dành cho Android >= 8 (Chọn channel để hiện thông báo)
      }
    })
  }

  useEffect(() => {
    requestPermissionsForNotification();
    setNotificationChannel();
  }, []); // Hàm này sẽ chạy khi mở ứng dụng, dùng để cấp quyền và tạo channel

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Click to receive notification" onPress={() => handleButtonClickReceiveNotification()}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
