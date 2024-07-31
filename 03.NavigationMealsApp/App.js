import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import CategoryScreen from "./screen/CategoryScreen";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <CategoryScreen />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
