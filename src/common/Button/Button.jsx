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
  return (
    <button
      className={clsx(css.button, styleType && css[styleType], className)}
      type={type}
      disabled={disabled}
      style={{
        padding: `${paddingsY}px ${paddingsX}px`,
        // maxWidth: maxWidth,
      }}
      onClick={onClick}
    >
      {name} {children}
    </button>
  );
}
