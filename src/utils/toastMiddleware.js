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
]);

const silentErrors = ["fetchCurrentUser"];

export const toastMiddleware = () => (next) => (action) => {
  // ✅ Обробка помилок
  if (isRejected(action)) {
    for (const [key, handler] of errorHandlersMap.entries()) {
      if (action.type.includes(key)) {
        const errorMessage =
          typeof handler === "function" ? handler(action) : handler;

        const isSilent = silentErrors.some((s) => action.type.includes(s));
        if (!isSilent && errorMessage) {
          toast.error(errorMessage);
        }
        break;
      }
    }
  }

  // ✅ Обробка успіху
  if (isFulfilled(action)) {
    for (const [key, message] of successMessagesMap.entries()) {
      if (action.type.includes(key)) {
        const text = typeof message === "function" ? message(action) : message;
        if (text) toast.success(text);
        break;
      }
    }
  }

  return next(action);
};
