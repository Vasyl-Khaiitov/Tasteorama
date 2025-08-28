import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import css from "./LogoutModal.module.css";

export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <Modal title="Are you sure?" message="We will miss you!" onClose={onCancel}>
      <Button
        type="button"
        styleType="read"
        name="logout"
        paddingsY="12"
        paddingsX="54"
        aria-label="Log out"
        className={css.logoutBtn}
        onClick={onConfirm}
      />
      <Button
        type="button"
        styleType="transparent"
        name="cancel"
        paddingsY="12"
        paddingsX="54"
        aria-label="Cancel"
        className={css.logoutBtn}
        onClick={onCancel}
      />
    </Modal>
  );
}
