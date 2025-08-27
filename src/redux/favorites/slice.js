import { createSlice } from "@reduxjs/toolkit";
import { fetchFavoriteRecipes, addToFavorites, deleteFromFavorites } from "./operation.js";
import { handleError, handlePending } from "../../utils/reduxUtils";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    hasMore: true,
  },
  extraReducers: (builder) => {
    builder
      // fetch favorites
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
        state.hasMore = action.payload.hasNextPage ?? false;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleError)

      // add to favorites (по _id)
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const newId = action.payload;
        if (!state.items.some(r => r._id === newId)) {
          state.items.push({ _id: newId });
        }
      })
      .addCase(addToFavorites.rejected, handleError)

      // delete from favorites
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(r => r._id !== id);
      })
      .addCase(deleteFromFavorites.rejected, handleError);
  },
});

export default favoritesSlice.reducer;
