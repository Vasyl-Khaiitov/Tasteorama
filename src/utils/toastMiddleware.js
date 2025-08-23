import { isRejected, isFulfilled } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const successMessagesMap = new Map([
  ["fetchRegisterUser", "Registration successful!"],
  [
    "fetchLoginUser",
    (action) => `Welcome, ${action.payload?.user?.name || "user"}!`,
  ],
  ["fetchLogoutUser", "See you soon!"],
]);

const errorHandlersMap = new Map([
  [
    "fetchLoginUser",
    (action) => {
      const status = action.payload?.status;
      const message = action.payload?.message?.toLowerCase();
      if (status === 401) return "Wrong email or password.";
      if (message?.includes("not registered")) return "User not found.";
      return "Login failed.";
    },
  ],
  ["fetchRegisterUser", () => "Registration failed. Try another email."],
  ["fetchLogoutUser", () => "Logout failed."],
]);

const silentErrors = ["fetchCurrentUser"];

export const toastMiddleware = () => (next) => (action) => {
  if (isRejected(action)) {
    let errorMessage;

    for (const [key, handler] of errorHandlersMap.entries()) {
      if (action.type.includes(key)) {
        errorMessage =
          typeof handler === "function" ? handler(action) : handler;
        break;
      }
    }

    if (!errorMessage) {
      errorMessage =
        action.payload?.message ||
        action.error?.message ||
        "Something went wrong.";
    }

    const isSilent = silentErrors.some((s) => action.type.includes(s));
    if (errorMessage && !isSilent) {
      toast.error(errorMessage);
    }
  }

  if (isFulfilled(action)) {
    console.log(action);

    for (const [key, message] of successMessagesMap.entries()) {
      if (action.type.includes(key)) {
        const text = typeof message === "function" ? message(action) : message;
        toast.success(text);
        break;
      }
    }
  }

  return next(action);
};
