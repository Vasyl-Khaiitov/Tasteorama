import { createAsyncThunk } from "@reduxjs/toolkit";
import publicApiClient from "../../api/publicApi";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAllRecipes",
  async ({ page, perPage, title }, thunkAPI) => {
    try {
      const res = await publicApiClient.get("/recipes", {
        params: { page, perPage, title: title || "" },
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
  }
);

export const loadMoreRecipes = createAsyncThunk(
  "recipes/loadMoreRecipes",
  async ({ page, perPage, title }, thunkAPI) => {
    try {
      const res = await publicApiClient.get("/recipes", {
        params: { page, perPage, title: title || "" },
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
      const { data } = await publicApiClient.get(`/recipes/${recipeId}`);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
