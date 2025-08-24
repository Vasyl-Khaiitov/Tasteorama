import { createSlice } from "@reduxjs/toolkit";
import { fetchFavoritesRecipes } from "./operation.js";
import { handleError, handlePending } from "../../utils/reduxUtils";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    // isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, (state, { payload }) => {
        state.error = null;
        console.log(payload);
        state.items = payload.favorites;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesRecipes.rejected, handleError);
  },
});

export default favoritesSlice.reducer;
