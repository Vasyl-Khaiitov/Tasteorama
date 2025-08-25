import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoritesRecipes",
  async ({ userId, token, page, perPage }, thunkAPI) => {
    try {
      const res = await apiClient.get(`/recipes/${userId}/favorites`, {
        params: {
          page,
          per_page: perPage,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("FETCH FAVORITES RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
