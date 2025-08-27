import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, fetchRecipesById, loadMoreRecipes } from "./operations";
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
    isLoadingMoreRecipes: false,
  },
  reducers: {
    resetRecipes(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
      state.currentRecipe = null;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Початкове завантаження =====
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload.items; // overwrite
        state.page = payload.page;
        state.hasMore = payload.hasNextPage;
      })
      .addCase(fetchRecipes.rejected, handleError)

      // ===== Рецепт за id =====
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
      })

      // ===== Довантаження (Load More) =====
      .addCase(loadMoreRecipes.pending, (state) => {
        state.error = null;
        state.isLoadingMoreRecipes = true;
      })
      .addCase(loadMoreRecipes.fulfilled, (state, { payload }) => {
        state.error = null;

        const existingIds = new Set(state.items.map((r) => r._id));
        const unique = payload.items.filter((r) => !existingIds.has(r._id));

        state.items.push(...unique);
        state.page = payload.page;
        state.hasMore = payload.hasNextPage;
        state.isLoadingMoreRecipes = false;
      })
      .addCase(loadMoreRecipes.rejected, (state, action) => {
        state.isLoadingMoreRecipes = false;
        handleError(state, action);
      });
  },
});

export const { resetRecipes, setPage } = recipesSlice.actions;

export default recipesSlice.reducer;
