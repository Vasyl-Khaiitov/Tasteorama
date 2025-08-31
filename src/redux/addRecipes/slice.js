import { createSlice } from "@reduxjs/toolkit";
import { fetchPostRecipes } from "./operations";

const addRecipesSlice = createSlice({
  name: "addRecipes",
  initialState: {
    isLoading: false,
    error: null,
    createdRecipe: null,
  },
  reducers: {
    resetCreatedRecipe: (state) => {
      state.createdRecipe = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.createdRecipe = payload;
      })
      .addCase(fetchPostRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.createdRecipe = null;
      });
  },
});

export const addRecipesReducer = addRecipesSlice.reducer;
export const { resetCreatedRecipe } = addRecipesSlice.actions;
