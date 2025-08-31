import css from "./AuthorModal.module.css";
import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";

export default function AuthorModal({ onClose, onLogin, onRegister }) {
  return (
    <Modal
      title="Authorize required"
      message="To view your account, please log in or register first."
      onClose={onClose}
    >
      <div className={css.btnWrapper}>
        <Button
          type="button"
          styleType="transparent"
          name="Log in"
          paddingsY={8}
          paddingsX="54"
          aria-label="Log in"
          className={css.loginBtn}
          onClick={onLogin}
        />
        <Button
          type="button"
          styleType="brown"
          name="Register"
          paddingsY={8}
          paddingsX="54"
          aria-label="Register"
          className={css.authBtn}
          onClick={onRegister}
        />
      </div>
    </Modal>
  );
}
