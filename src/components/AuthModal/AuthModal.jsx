import React from "react";
import ReactDOM from "react-dom";
import Icon from "../../shared/Icon";
import css from "./AuthModal.module.css";

export default function AuthModal({ onClose, onNavigate }) {
  return ReactDOM.createPortal(
    <div
      className={css.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <Icon name="close" classname={css.closeIcon} />
        </button>
        <p className={css.modalTitle}>Error while saving</p>
        <p className={css.modalText}>
          To save this recipe, you need to authorize first.
        </p>
        <div className={css.modalActions}>
          <button
            type="button"
            className={css.outlineBtn}
            onClick={() => onNavigate("/auth/login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={css.filledBtn}
            onClick={() => onNavigate("/auth/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
