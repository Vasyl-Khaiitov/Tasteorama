import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, {
  deleteAuthorizationToken,
  setAuthorizationToken,
} from "../../api/api";
import { fetchFavoriteRecipes } from "../favorites/operation";

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (newUser, thunkAPI) => {
    try {
      const res = await apiClient.post("/auth/register", newUser);
      console.log("REGISTER RESPONSE:", res);

      const { accessToken } = res.data.data; // <-- виправлено
      setAuthorizationToken(accessToken);

      const dataUser = await apiClient.get("/users/currentUser");
      return {
        user: dataUser.data.data.info, // тут точно лежить { name, email, id, ... }
        token: accessToken,
      };
    } catch (err) {
      console.error("Register error:", err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  "auth/fetchLoginUser",
  async (credentials, thunkAPI) => {
    console.log("THUNK STARTED", credentials);
    try {
      const res = await apiClient.post("/auth/login", credentials);
      console.log("LOGIN RESPONSE:", res);

      const { accessToken } = res.data.data;
      setAuthorizationToken(accessToken);

      const dataUser = await apiClient.get("/users/currentUser");
      thunkAPI.dispatch(
        fetchFavoriteRecipes({
          userId: dataUser.data.data.info.id,
          token: accessToken,
          page: 1,
          perPage: 12,
        })
      );
      return {
        user: dataUser.data.data.info, // тут точно лежить { name, email, id, ... }
        token: accessToken,
      };
    } catch (err) {
      console.error("Login error:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

export const fetchLogoutUser = createAsyncThunk(
  "auth/fetchLogoutUser",
  async (_, thunkAPI) => {
    try {
      await apiClient.post("/auth/logout");
      deleteAuthorizationToken();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/users/currentUser");
      console.log("API /users response:", res);
      return res.data.data.info;
    } catch (err) {
      if (err.response?.status === 401) {
        deleteAuthorizationToken();
        return thunkAPI.rejectWithValue("Session expired. Please login again.");
      }
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
