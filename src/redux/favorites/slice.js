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
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        console.log("FULFILLED PAYLOAD:", action.payload);
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data.recipes;
        state.hasMore = action.payload.data.hasNextPage;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleError);
  },
});

export default favoritesSlice.reducer;
