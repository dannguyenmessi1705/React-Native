# File `app.json` trong REACT-NATIVE với Expo

## 1. Giới thiệu
- `app.json` là file cấu hình cho ứng dụng React Native.
- File này chứa các thông tin cấu hình cho ứng dụng như tên ứng dụng, phiên bản, icon, splash screen, cài đặt cho Expo, ...
- File này cũng chứa các thông tin về các thư viện và các module cần thiết cho ứng dụng.

## 2. Cấu trúc file `app.json`
- File `app.json` có cấu trúc như sau:
```json
{
  "expo": { // Thông tin cấu hình cho Expo
    "name": "01.RNProject", // Tên ứng dụng 
    "slug": "01.RNProject", // Tên ứng dụng 
    "version": "1.0.0",  // Phiên bản ứng dụng
    "orientation": "portrait", // Hướng màn hình
    "icon": "./assets/icon.png", // Icon cho ứng dụng
    "userInterfaceStyle": "light", // Giao diện người dùng
    "backgroundColor": "#1e085a", // Màu nền cho ứng dụng
    "description": "", // Mô tả ứng dụng
    "sdkVersion": "42.0.0", // Phiên bản SDK
    "platforms": [ // Các nền tảng hỗ trợ
      "ios",
      "android",
      "web"
    ],
    "updates": { // Cập nhật
      "fallbackToCacheTimeout": 0
    },
    "splash": { // Splash screen
      "image": "./assets/splash.png", // Ảnh splash screen
      "resizeMode": "contain", // Chế độ resize, có thể là contain, cover, stretch, center, repeat, ...
      "backgroundColor": "#ffffff" // Màu nền
    },
    "assetBundlePatterns": [ // Đường dẫn đến các file tài nguyên
      "**/*" // Tất cả các file
    ],
    "ios": { // Cấu hình cho IOS
      "supportsTablet": true // Hỗ trợ tablet
    },
    "android": { // Cấu hình cho Android
      "adaptiveIcon": { // Icon cho Android
        "foregroundImage": "./assets/adaptive-icon.png", // Icon
        "backgroundColor": "#ffffff", // Màu nền
        "foregroundImageScale": 0.5, // Tỉ lệ icon
        "roundIcon": true, // Icon tròn
        "roundIconRadius": 10,// Bán kính icon
        "legacy": true, // Hỗ trợ phiên bản cũ
        "forceLegacyIcon": true, // Bắt buộc sử dụng icon cũ
        "adaptiveIconBackground":, "#ffffff" // Màu nền cho icon
      }
    },
    "web": { // Cấu hình cho web
      "favicon": "./assets/favicon.png", // Favicon
    }
  }
}

```
