import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, handleError);
  },
});

export default ingredientsSlice.reducer;
