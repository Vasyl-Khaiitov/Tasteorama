import { toast } from "react-toastify";
import { isRejected, isFulfilled } from "@reduxjs/toolkit";

const successMessagesMap = new Map([
  ["fetchRegisterUser", "Registration successful!"],
  [
    "fetchLoginUser",
    (action) => `Welcome, ${action.payload?.user?.name || "user"}!`,
  ],
  ["fetchLogoutUser", "See you soon!"],
  // Заглушка для fetchCurrentUser (не показуємо toast)
  ["fetchCurrentUser", null],
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
  // Заглушка для fetchCurrentUser (не показуємо помилку)
  ["fetchCurrentUser", () => null],
]);

export const toastMiddleware = () => (next) => (action) => {
  if (isRejected(action)) {
    if (action.type.includes("fetchRecipesById")) {
      return next(action);
    }

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

    if (errorMessage) toast.error(errorMessage);
  }

  if (isFulfilled(action)) {
    for (const [key, message] of successMessagesMap.entries()) {
      if (action.type.includes(key)) {
        if (message) {
          const text =
            typeof message === "function" ? message(action) : message;
          toast.success(text);
        }
        break;
      }
    }
  }

  return next(action);
};
