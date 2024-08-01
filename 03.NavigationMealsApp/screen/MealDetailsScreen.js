import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useLayoutEffect } from "react";

import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import IconButton from "../components/IconButton";
// import { useFavoriteContext } from "../store/context/FavoriteContext";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorite";

function MealDetailScreen({ route, navigation }) {
  // const favoriteContext = useFavoriteContext();
  const favoriteIds = useSelector((state) => state.favoriteMeals.ids);
  const dispacth = useDispatch();

  const mealId = route.params.mealId;

  // const isFavorited = favoriteContext.ids.includes(mealId);
  const isFavorited = favoriteIds.includes(mealId);

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const handleClickStar = () => {
    if (isFavorited) {
      // favoriteContext.removeFavorite(mealId);
      dispacth(removeFavorite({ id: mealId }));
    } else {
      // favoriteContext.addFavorite(mealId);
      dispacth(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={isFavorited ? "star" : "star-outline"}
          color="white"
          onPress={() => handleClickStar()}
        />
      ),
    });
  }, [navigation, isFavorited]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
