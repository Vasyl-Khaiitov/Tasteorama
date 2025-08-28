import { createAsyncThunk } from "@reduxjs/toolkit";
import publicApiClient from "../../api/publicApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await publicApiClient.get("/categories");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
