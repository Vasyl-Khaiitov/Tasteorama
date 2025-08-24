import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";
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
      .addCase(fetchRecipes.rejected, handleError);
  },
});

export default recipesSlice.reducer;
