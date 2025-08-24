import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchCurrentUser,
} from "./operations";
import {
  handleError,
  handleLogoutState,
  handlePending,
} from "../../utils/reduxUtils";
const tokenFromLS = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  
  initialState: {
    user: { name: '', email: '' },
    token: tokenFromLS,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, handlePending)
      .addCase(fetchRegisterUser.fulfilled, (state, { payload }) => {
        state.error = null;
        // state.user = payload.user || null;
        // state.token = payload.token || null;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(fetchRegisterUser.rejected, handleError)

      .addCase(fetchLoginUser.pending, handlePending)
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.error = null;
        // Was changed according AI recomendation and analise log API/responce
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(fetchLoginUser.rejected, handleError)

      .addCase(fetchLogoutUser.pending, handlePending)
      .addCase(fetchLogoutUser.fulfilled, handleLogoutState)
      .addCase(fetchLogoutUser.rejected, handleError)

      // сюда добавляем fetchCurrentUser
      // .addCase(fetchCurrentUser.pending, handlePending)
      // .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      //   state.user = payload;
      //   state.isLoggedIn = true;
      //   state.isLoading = false;
      //   state.error = null;
      // })
      // .addCase(fetchCurrentUser.rejected, handleLogoutState);

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
      });
  },
});

export const authReducer = authSlice.reducer;
