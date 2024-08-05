import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import PlaceDetails from "./screens/PlaceDetails";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { init } from "./util/database";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setReady] = useState(false); // Khởi tạo state isReady với giá trị false
  useEffect(() => {
    async function prepare() {
      // Khai báo hàm prepare
      try {
        await SplashScreen.preventAutoHideAsync(); // Ngăn chặn ẩn màn hình splash
        await init(); // Khởi tạo cơ sở dữ liệu
      } catch (error) {
        console.warn(error);
      } finally {
        setReady(true); // Kết thúc quá trình chuẩn bị
      }
    }
    prepare(); // Gọi hàm prepare
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // Nếu quá trình chuẩn bị đã kết thúc
      await SplashScreen.hideAsync(); // Ẩn màn hình splash
    }
  }, [isReady]); // Khai báo hàm onLayoutRootView dùng để ẩn màn hình splash khi quá trình chuẩn bị kết thúc

  if (!isReady) return null; // Nếu quá trình chuẩn bị chưa kết thúc thì return null

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer
        onReady={onLayoutRootView} // Sự kiện onReady được gọi khi quá trình chuẩn bị kết thúc
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Map",
            }}
          />
          <Stack.Screen 
            name="PlaceDetails"
            component={PlaceDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
