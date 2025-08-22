import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginUser, fetchLogoutUser, fetchRegisterUser, fetchCurrentUser } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, handlePending)
      .addCase(fetchRegisterUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.user = payload.user || null;
        state.token = payload.token || null;
        state.isLoading = false;
      })
      .addCase(fetchRegisterUser.rejected, handleError)

      .addCase(fetchLoginUser.pending, handlePending)
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.user = payload.user || null; // на бэке может быть пока undefined
        state.token = payload.token || null;
        state.isLoggedIn = !!payload.token;
        state.isLoading = false;
      })
      .addCase(fetchLoginUser.rejected, handleError)

      .addCase(fetchLogoutUser.pending, handlePending)
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(fetchLogoutUser.rejected, handleError)

      // сюда добавляем fetchCurrentUser
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, handleError);
  },
});

export const authReducer = authSlice.reducer;
