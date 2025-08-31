import { createSlice } from "@reduxjs/toolkit";
import { fetchOwnRecipes } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";
import { fetchLogoutUser } from "../auth/operations";

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
    isInitialized: false,
  },
  reducers: {
    resetOwnRecipes: (state) => {
      state.items = [];
      state.page = 1;
      state.totalItems = 0;
      state.hasMore = true;
      state.error = null;
      state.isInitialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const { recipes, totalItems } = action.payload;

        state.items = [...state.items, ...recipes];
        state.page += 1;
        state.hasMore = recipes.length === state.perPage;
        state.totalItems = totalItems;
        state.isInitialized = true;
      })
      .addCase(fetchOwnRecipes.rejected, handleError)
      // очищення при логауті
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.items = [];
        state.page = 1;
        state.totalItems = 0;
        state.hasMore = true;
        state.error = null;
      });
  },
});

export const { resetOwnRecipes } = ownRecipesSlice.actions;
export default ownRecipesSlice.reducer;
