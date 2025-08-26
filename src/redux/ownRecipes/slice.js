import { createSlice } from "@reduxjs/toolkit";
import { fetchOwnRecipes } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const ownRecipesSlice = createSlice({
  name: "ownRecipes",
  initialState: {
    items: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    hasMore: true,
    totalItems: 0,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [...state.items, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length === state.perPage;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchOwnRecipes.rejected, handleError);
  },
});

export default ownRecipesSlice.reducer;
