import { Button, StyleSheet, Text, View } from "react-native";

import MealsList from "../components/MealsList/MealsList";
// import { useFavoriteContext } from "../store/context/FavoriteContext";
import { useSelector } from "react-redux";
import { MEALS } from "../data/dummy-data";

function FavoritesScreen() {
  // const favoriteContext = useFavoriteContext();
  const favoriteIds = useSelector((state) => state.favoriteMeals.ids);

  // const listFavorites = MEALS.filter((meal) =>
  //   favoriteContext.ids.includes(meal.id)
  // );
  const listFavorites = MEALS.filter((meal) => favoriteIds.includes(meal.id));

  if (listFavorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You have no favorite meal yet.</Text>
      </View>
    );
  }

  return <MealsList items={listFavorites} />;
}

export default FavoritesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
