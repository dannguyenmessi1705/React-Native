import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export const FavoriteContextProvider = ({ children }) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  const addFavorite = (id) => {
    setFavoriteMealIds((cur) => [...cur, id]);
  };

  const removeFavorite = (id) => {
    setFavoriteMealIds((cur) => cur.filter((mealId) => mealId !== id));
  };

  const provider = {
    ids: favoriteMealIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoriteContext.Provider value={provider}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavoriteContext must be used within a FavoriteContextProvider"
    );
  }
  return context;
};
