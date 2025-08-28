import { createSlice } from "@reduxjs/toolkit";
import { fetchFavoriteRecipes } from "./operation.js";
import { handleError, handlePending } from "../../utils/reduxUtils";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    resetFavorites: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const recipes = action.payload.data || [];
        const hasNextPage = action.payload.hasNextPage;

        if (state.page === 1) {
          // перша сторінка → замінюємо масив
          state.items = recipes;
        } else {
          // наступні сторінки → додаємо до існуючих
          state.items = [...state.items, ...recipes].filter(
            (recipe, index, self) =>
              index === self.findIndex((r) => r._id === recipe._id)
          );
        }

        state.page += 1; // локальна сторінка
        state.hasMore = hasNextPage;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleError);
  },
});

export const { resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
