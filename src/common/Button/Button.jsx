import css from "./Button.module.css";
import { clsx } from "clsx";

export default function Button({
  type,
  name,
  styleType,
  paddingsY = 8,
  paddingsX = 0,
  disabled = false,
  maxWidth,
}) {
  return (
    <button
      className={clsx(css.button, styleType && css[styleType])}
      type={type}
      disabled={disabled}
      style={{
        padding: `${paddingsY}px ${paddingsX}px`,
        maxWidth: maxWidth,
      }}
    >
      {name}
    </button>
  );
}
