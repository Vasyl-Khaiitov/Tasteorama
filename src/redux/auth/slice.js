import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
} from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, handlePending)
      .addCase(fetchRegisterUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(fetchRegisterUser.rejected, handleError)
      .addCase(fetchLoginUser.pending, handlePending)
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(fetchLoginUser.rejected, handleError)
      .addCase(fetchLogoutUser.pending, handlePending)
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(fetchLogoutUser.rejected, handleError);
  },
});
export const authReducer = authSlice.reducer;
