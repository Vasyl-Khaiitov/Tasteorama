import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAllIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/ingredients");
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
