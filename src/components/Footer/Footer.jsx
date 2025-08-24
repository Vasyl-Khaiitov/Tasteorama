import css from "./Footer.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import Icon from "../../shared/Icon";

export default function Footer() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      navigate("/profile/${recipeType}");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowModal(false); // закриє вікно після переходу
  };

  return (
    <footer className={css.footer}>
      <Logo />

      <p className={css.text}>© 2025 CookingCompanion. All rights reserved.</p>

      <nav className={css.nav}>
        <NavLink className={css.link} to="/">
          Recipes
        </NavLink>

        <button
          className={css.linkButton}
          type="button"
          onClick={handleAccountClick}
        >
          Account
        </button>
      </nav>

      {showModal && (
        <div className={css.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={css.closeBtn}
              onClick={() => setShowModal(false)}
              type="button"
            >
              <Icon name="close" classname={css.closeIcon} />
            </button>
            <p className={css.modalTitle}>Authorize required</p>
            <p className={css.modalText}>
              To view your account, please log in or register first.
            </p>
            <div className={css.modalActions}>
              <button
                className={css.outlineBtn}
                onClick={() => handleNavigate("/auth/login")}
              >
                Log in
              </button>
              <button
                className={css.filledBtn}
                onClick={() => handleNavigate("/auth/register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
