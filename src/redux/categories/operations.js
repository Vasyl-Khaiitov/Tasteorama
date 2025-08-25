import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/categories");
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
