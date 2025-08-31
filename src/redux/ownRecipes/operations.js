import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchOwnRecipes = createAsyncThunk(
  "ownRecipes/fetchOwn",
  async ({ page, perPage }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    try {
      const res = await apiClient.get("/recipes/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          per_page: perPage,
        },
      });

      return { recipes: res.data.data, totalItems: res.data.total };
    } catch (err) {
      console.error(
        "fetchOwnRecipes error:",
        err.response?.data || err.message
      );

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
