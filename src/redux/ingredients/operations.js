import { createAsyncThunk } from "@reduxjs/toolkit";

import publicApiClient from "../../api/publicApi";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAllIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await publicApiClient.get("/ingredients");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
