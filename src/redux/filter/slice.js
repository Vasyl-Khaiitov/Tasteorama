import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    name: "",
    category: "",
    ingredient: ""
  },
  reducers: {
    changeRecipeSearch(state, action) {
      state.name = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setIngredient(state, action) {
      state.ingredient = action.payload;
    },
    resetFilters(state) {
      state.name = "";
      state.category = "";
      state.ingredient = "";
    },
  },
});

export const { changeRecipeSearch, setCategory, setIngredient, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
