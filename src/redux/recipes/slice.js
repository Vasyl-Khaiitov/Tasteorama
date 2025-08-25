import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, fetchRecipesById } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    page: 1,
    perPage: 12,
    hasMore: true,
    isLoading: false,
    error: null,
    currentRecipe: null,
    isLoadingCurrentRecipe: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const newRecipes = action.payload.data.data.filter(
          (recipe) => !state.items.some((r) => r._id === recipe._id)
        );

        state.items = [...state.items, ...newRecipes];

        state.hasMore = action.payload.data.hasNextPage;

        state.page = action.payload.data.page + 1;
      })
      .addCase(fetchRecipes.rejected, handleError)
      .addCase(fetchRecipesById.pending, (state) => {
        state.error = null;
        state.isLoadingCurrentRecipe = true;
      })
      .addCase(fetchRecipesById.fulfilled, (state, { payload }) => {
        state.error = null;
        state.currentRecipe = payload;
        state.isLoadingCurrentRecipe = false;
      })
      .addCase(fetchRecipesById.rejected, (state, action) => {
        state.isLoadingCurrentRecipe = false;
        handleError(state, action);
      });
  },
});

export default recipesSlice.reducer;
