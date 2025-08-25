import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchOwnRecipes = createAsyncThunk(
  "ownRecipes/fetchOwn",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const res = await apiClient.get("/recipes/my", {
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
