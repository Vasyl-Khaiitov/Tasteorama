import React from "react";
import css from "./Button.module.css";
import { clsx } from "clsx";

export default function Button({
  type,
  name,
  styleType,
  paddingsY = 8,
  paddingsX = 0,
  disabled = false,
  // maxWidth,
  onClick,
  children,
  className,
}) {
  const adjustedPaddingsY =
    typeof name !== "string" && React.isValidElement(name)
      ? paddingsY + 8
      : paddingsY;

  return (
    <button
      className={clsx(css.button, styleType && css[styleType], className)}
      type={type}
      disabled={disabled}
      style={{
        padding: `${adjustedPaddingsY}px ${paddingsX}px`,
      }}
      onClick={onClick}
    >
      {name} {children}
    </button>
  );
}
