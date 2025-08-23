export const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};
export const handleError = (state, { payload, error }) => {
  state.isLoading = false;
  state.error = {
    message:
      payload?.response?.data?.message || error?.message || "Щось пішло не так",
    code: payload?.status || error?.code,
  };
};
export const handleLogoutState = (state) => {
  state.error = null;
  state.user = null;
  state.token = null;
  state.isLoggedIn = false;
  state.isLoading = false;
};
