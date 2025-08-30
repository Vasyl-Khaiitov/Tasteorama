import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/api";

export const fetchPostRecipes = createAsyncThunk(
  "recipes/postRecipes",
  async ({ formData }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    try {
      const res = await apiClient.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
