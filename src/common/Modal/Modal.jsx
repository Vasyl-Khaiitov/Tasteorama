import { useEffect } from "react";
import Icon from "../../shared/Icon";
import css from "./Modal.module.css";

export default function Modal({ title, message, onClose, children }) {
  // Add Esc for close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="close" classname={css.closeIcon} />
        </button>
        {title && <h2 className={css.title}>{title}</h2>}
        {message && <p className={css.message}>{message}</p>}
        <div className={css.actions}>{children}</div>
      </div>
    </div>
  );
}
