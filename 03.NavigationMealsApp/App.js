import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CategoryScreen from "./screen/CategoryScreen";
import MealsOverviewScreen from "./screen/MealsOverviewScreen";
import MealDetailScreen from "./screen/MealDetailsScreen";
import FavoritesScreen from "./screen/FavoritesScreen";
import Tab1 from "./screen/Tab1";
import Tab2 from "./screen/Tab2";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" }, // Màu header
        headerTintColor: "white", // Màu chữ header
        sceneContainerStyle: { backgroundColor: "#3f2f25" }, // Màu nền màn hình
        drawerContentStyle: { backgroundColor: "#351401" }, // Màu nền drawer
        drawerInactiveTintColor: "white", // Màu chữ drawer khi không active
        drawerActiveTintColor: "#351401", // Màu chữ drawer khi active
        drawerActiveBackgroundColor: "#e4baa1", // Màu nền drawer khi active
      }}
    >
      <Drawer.Screen
        name="Categories" // Tên màn hình
        component={CategoryScreen} // Component sẽ render ra màn hình
        options={{
          // Các options của màn hình
          title: "All Categories", // Tiêu đề của màn hình
          drawerIcon: (
            { color, size } // Icon của màn hình, color và size được truyền vào từ Drawer.Navigator, 1 function trả về 1 component
          ) => (
            <Ionicons name="list" color={color} size={size} /> // Icon sử dụng Ionicons, name là tên icon, color và size được truyền vào từ Drawer.Navigator
          ),
        }}
      />
      <Drawer.Screen
        name="FavoritesDrawer" // Tên màn hình
        component={BottomTabNavigator} // Component sẽ render ra màn hình
        options={{
          title: "Favorites",
          // Các options của màn hình
          drawerIcon: (
            { color, size } // Icon của màn hình, color và size được truyền vào từ Drawer.Navigator, 1 function trả về 1 component
          ) => (
            <Ionicons name="star" color={color} size={size} /> // Icon sử dụng Ionicons, name là tên icon, color và size được truyền vào từ Drawer.Navigator
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }} // Ẩn header
    >
      <BottomTab.Screen
        name="Favorites" // Tên màn hình
        component={FavoritesScreen} // Component sẽ render ra màn hình
        options={{ // Các options của màn hình
          tabBarIcon: ({ color, size }) => ( // Icon của màn hình, color và size được truyền vào từ BottomTab.Navigator, 1 function trả về 1 component
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tab1"
        component={Tab1}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tab2"
        component={Tab2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Categories"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#351401",
            },
            headerTintColor: "white",
            contentStyle: {
              backgroundColor: "#3f2f25",
            },
          }}
        >
          <Stack.Screen
            name="Drawers"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            options={{
              title: "Meals Overview",
            }}
          />
          <Stack.Screen name="MealDetails" component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
