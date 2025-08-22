import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, {
  deleteAuthorizationToken,
  setAuthorizationToken,
} from "../../api/api";

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (newUser, thunkAPI) => {
    try {
      const res = await apiClient.post("/auth/register", newUser);
      console.log("REGISTER RESPONSE:", res);

      const { accessToken } = res.data.data; // <-- виправлено
      setAuthorizationToken(accessToken);

      const dataUser = await apiClient.get("/users");
      return dataUser.data.data;
    } catch (err) {
      console.error("Register error:", err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  "auth/fetchLoginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await apiClient.post("/auth/login", credentials);
      console.log("LOGIN RESPONSE:", res);

      const { accessToken } = res.data.data;
      setAuthorizationToken(accessToken);

      const dataUser = await apiClient.get("/users");
      return dataUser.data.data;
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
    const tokenFromState = thunkAPI.getState().auth.token;
    const tokenFromLS = localStorage.getItem("token"); 
    const token = tokenFromState || tokenFromLS;

    console.log("Current token:", token);

    if (!token) return thunkAPI.rejectWithValue("No token found");

    setAuthorizationToken(token);

    try {
      const res = await apiClient.get("/users", {
        headers: { "Cache-Control": "no-cache" },
      });
      console.log("API /users response:", res);
      return res.data.data.info;
    } catch (err) {
      console.error("fetchCurrentUser error:", err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


