import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFavoriteRecipes,
  addToFavorites,
  deleteFromFavorites,
} from "./operation.js";
import { handleError, handlePending } from "../../utils/reduxUtils";
import { fetchLogoutUser } from "../auth/operations.js";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    hasMore: true,
    page: 1,
    total: 0,
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
      // fetch favorites
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.total = action.payload.totalItems;
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
      .addCase(fetchFavoriteRecipes.rejected, handleError)

      // add to favorites (по _id)
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const newId = action.payload;
        if (!state.items.some((r) => r._id === newId)) {
          state.items.push({ _id: newId });
        }
      })
      .addCase(addToFavorites.rejected, handleError)

      // delete from favorites
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((r) => r._id !== id);
        if (state.total > 0) {
          state.total -= 1;
        }
      })
      .addCase(deleteFromFavorites.rejected, handleError)
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.error = null;
        state.hasMore = true;
      });
  },
});

export const { resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
