import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import recipesReduser from "./recipes/slice.js";
import favoritesSlice from "./favorites/slice.js";
import categoriesReducer from "./categories/slice.js";
import ingredientsReducer from "./ingredients/slice.js";
import ownRecipesReducer from "./ownRecipes/slice";
import { toastMiddleware } from "../utils/toastMiddleware";
import filterReducer from "./filter/slice.js";
import { addRecipesReducer } from "./addRecipes/slice.js";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["items"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    recipes: recipesReduser,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    favorites: persistReducer(favoritesPersistConfig, favoritesSlice),
    ownRecipes: ownRecipesReducer,
    filter: filterReducer,
     addRecipes: addRecipesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(toastMiddleware),
});

export const persistor = persistStore(store);
