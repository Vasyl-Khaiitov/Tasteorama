import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAllRecipes",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const response = await apiClient.get("/recipes", {
        params: {
          page: page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchRecipesById = createAsyncThunk(
  "recipes/fetchRecipesById",
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`/recipes/${recipeId}`);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
