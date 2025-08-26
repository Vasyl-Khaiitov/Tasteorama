import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { name: "" },
  reducers: {
    changeRecipeSearch(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeRecipeSearch } = filterSlice.actions;
export default filterSlice.reducer;
