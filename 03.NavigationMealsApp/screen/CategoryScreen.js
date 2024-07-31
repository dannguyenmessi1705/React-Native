import { FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function CategoryScreen({ navigation }) {
  const renderCategoryItem = (itemData) => {
    function handlePress() {
      navigation.navigate("MealsOverview", { categoryId: itemData.item.id }); // Navigate đến màn hình MealsOverview và truyền tham số categoryId
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPressed={handlePress}
      />
    );
  };
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(item) => renderCategoryItem(item)}
      numColumns="2"
    />
  );
}

export default CategoryScreen;
