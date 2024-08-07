import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View, Platform} from 'react-native';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device"
import Constants from "expo-constants";
import { useEffect } from "react"

Notifications.setNotificationHandler({
  handleNotification: async (notify) => {
    return {
      shouldShowAlert: true, // Hiện thông báo
      shouldPlaySound: true, // Phát âm thanh
      shouldSetBadge: true // Hiện số thông báo
    }
  }
}); // Hàm này sẽ xử lý thông báo khi thông báo đến

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

// Tạo hàm để đăng ký thông báo từ server (push notification) (Bao gồm cấp quyền, tạo channel, lấy token)
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') { // Nếu là Android thì tạo channel
    await Notifications.setNotificationChannelAsync("test", {
      name: "Notification Channel", // Tên channel
      importance: Notifications.AndroidImportance.HIGH, // Mức độ quan trọng
      enableVibrate: true, // Cho phép rung
      vibrationPattern: [0, 250, 250, 250], // Chuỗi rung [delay, rung, delay, rung, ...]
      lightColor: "#FF231F7C", // Màu sáng khi có thông báo
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC, // Hiển thị thông báo ở màn hình khóa
      // sound: "notification.wav" // Âm thanh thông báo (KHÔNG NÊN SỬ DỤNG)
    }) // Chỉ dành cho Android >= 8 (Tạo channel để hiện thông báo)
  }

  if (Device.isDevice) { // Nếu là thiết bị thật thì mới lấy token (Không lấy trên máy ảo)
    const { status: existingStatus } = await Notifications.getPermissionsAsync(); // Lấy quyền thông báo, nếu chưa có sẽ hiện thông báo cấp quyền
    let finalStatus = existingStatus; // Đặt biến finalStatus bằng existingStatus
    if (existingStatus !== 'granted') { // Nếu chưa cấp quyền (Do lần đầu cài đặt)
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: "true", // Cho phép hiện thông báo
          allowBadge: "true", // Cho phép hiện số thông báo
          allowSound: "true", // Cho phép phát âm thanh
          allowAnnouncements: "true" // Cho phép hiện thông báo ở màn hình khóa
        } // IOS Phải cấu hình thêm ở đây
      }); // Yêu cầu cấp quyền
      finalStatus = status; // Đặt biến finalStatus bằng status
    }
    if (finalStatus !== 'granted') { // Nếu trạng thái cuối cùng không được cấp quyền (Do người dùng không cấp quyền)
      handleRegistrationError('Permission not granted to get push token for push notification!'); // Thông báo lỗi
      return; // Kết thúc hàm
    }
    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId; // Lấy projectId từ Constants
    if (!projectId) {
      handleRegistrationError('Project ID not found'); // Thông báo lỗi nếu không tìm thấy projectId
    }
    try {
      const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
      ).data; // Lấy token từ server (push notification)
      console.log(pushTokenString); // Log token
      return pushTokenString; // Trả về token
    } catch (e) {
      handleRegistrationError(`${e}`); // Thông báo lỗi nếu có lỗi
    }
  } else { // Nếu không phải thiết bị thật
    handleRegistrationError('Must use physical device for push notifications'); // Thông báo lỗi
  }
}

export default function App() {

  useEffect(() => {
    registerForPushNotificationsAsync().then(expoTokenPush => {
      console.log("Chay thanh cong");
    })

    const subscriptionReceivedNotification = Notifications.addNotificationReceivedListener((notify) => {
      console.log("Received Notification: ", notify);
    }) // Hàm này sẽ lắng nghe khi có thông báo đến

    const subscriptionResponseNotification = Notifications.addNotificationResponseReceivedListener((res) => {
      console.log("Response Notification: ", res);
    }) // Hàm này sẽ lắng nghe khi có phản hồi từ thông báo (Từ User khi click vào thông báo)

    return () => {
      subscriptionReceivedNotification.remove(); // Hàm này sẽ ngừng lắng nghe khi Unmount component
      subscriptionResponseNotification.remove(); // Hàm này sẽ ngừng lắng nghe khi Unmount component
    }
  }, []); // Hàm này sẽ chạy khi mở ứng dụng, dùng để cấp quyền và tạo channel

  async function handleButtonClickReceiveNotification() {
    await Notifications.scheduleNotificationAsync({ // Hàm này sẽ lên lịch hiện thông báo sau khi trigger bật lên
      content: {
        title: "Local Notification", // Tiêu đề thông báo
        body: "This is a local notification", // Nội dung thông báo
        sound: Platform.OS === "ios" ? "default" : "" // Âm thanh thông báo (Nếu là IOS thì sẽ là âm thanh mặc định, còn Android thì không cần phải set vì nó sẽ tự động phát âm thanh mặc định)
        // sound: "notification.wav" // Chỉ dành cho Android <= 8 (KHÔNG NÊN SỬ DỤNG)
      },
      trigger: {
        seconds: 2, // Thời gian sau bao lâu sẽ hiện thông báo sau khi trigger bật lên
        channelId: "test", // Chỉ dành cho Android >= 8 (Chọn channel để hiện thông báo)
      }
    })
  }

  function handleButtonPushNotificationToAnotherDevice() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: "ExponentPushToken[KHPUH4OUwGdl_7EGff3KeS]",
        title: "Push Notification",
        body: "This is a push notification",
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Click to receive notification" onPress={() => handleButtonClickReceiveNotification()}/>
      <Button title="Click to push notification to another device" onPress={() => handleButtonPushNotificationToAnotherDevice()}/>
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
