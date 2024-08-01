import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react"; // Nên sử dụng useLayoutEffect thay vì useEffect để tránh việc màn hình bị render lại sau khi đã render xong, vì useLayoutEffect được gọi ngay sau khi render xong

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
  // Sử dụng route để lấy tham số truyền vào (props route chỉ được sử  dụng trong component đã đăng ký với `Stack.Screen`)
  const categoryId = route.params.categoryId; // Lấy tham số categoryId từ route.params

  const displayMeals = MEALS.filter((meal) => {
    return meal.categoryIds.includes(categoryId);
  }); // Lọc ra các bữa ăn có categoryId trùng với categoryId truyền vào

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title; // Lấy title của category có id trùng với categoryId

    navigation.setOptions({
      title: categoryTitle, // Set title động cho màn hình
    });
  }, [navigation, categoryId]); // [navigation, categoryId] là dependency array, nếu navigation hoặc categoryId thay đổi thì useLayoutEffect sẽ được gọi lại

  return <MealsList items={displayMeals} />;

  // const renderItem = (itemData) => {
  //   const item = itemData.item;
  //   const mealItempProps = {
  //     id: item.id,
  //     title: item.title,
  //     imageUrl: item.imageUrl,
  //     affordability: item.affordability,
  //     complexity: item.complexity,
  //     duration: item.duration,
  //   };
  //   return <MealItem {...mealItempProps} />;
  // };

  // return (
  //   <View style={styles.container}>
  //     <FlatList
  //       data={displayMeals}
  //       keyExtractor={(item) => item.id}
  //       renderItem={(itemData) => renderItem(itemData)}
  //     />
  //   </View>
  // );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
