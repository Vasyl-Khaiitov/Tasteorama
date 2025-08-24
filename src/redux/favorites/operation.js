import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoritesRecipes",
  async (userId, { page, perPage }, thunkAPI) => {
    try {
      const res = apiClient.get(`/recipes/${userId}/favorites`, {
        params: {
          page: page,
          per_page: perPage,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
