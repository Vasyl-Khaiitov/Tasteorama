import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavoritesRecipes = createAsyncThunk(
  "/profile/favorites",
  async (__, thunkAPI) => {
    try {
      const res = await axios.get("/recipes/${userId}/favorite");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
