import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        console.log(action.payload);


        state.error = null;
      })
      .addCase(fetchCategories.rejected, handleError);
  },
});

export default categoriesSlice.reducer;
