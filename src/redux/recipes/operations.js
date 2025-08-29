import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAllRecipes",
  async ({ page, perPage, title, category, ingredient }, thunkAPI) => {
    try {
      const res = await apiClient.get("/recipes", {
        params: { page, perPage, title: title || "", category: category || "",
          ingredients: ingredient || "" },
      });

      const { data } = res.data; // беремо саме поле "data"

      return {
        items: data.data, // масив рецептів
        page: data.page,
        perPage: data.perPage,
        hasNextPage: data.hasNextPage,
        total: data.totalItems,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  
  });

export const loadMoreRecipes = createAsyncThunk(
  "recipes/loadMoreRecipes",
  async ({ page, perPage, title, category, ingredient }, thunkAPI) => {
    try {
      const res = await apiClient.get("/recipes", {
        params: { page, perPage, title: title || "", category: category || "",
          ingredients: ingredient || "" },
      });

      const { data } = res.data;

      return {
        items: data.data,
        page: data.page,
        perPage: data.perPage,
        hasNextPage: data.hasNextPage,
        total: data.totalItems,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
