import css from "./Footer.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import Icon from "../../shared/Icon";
import AuthorModal from "../AuthorModal/AuthorModal";

export default function Footer() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      navigate("/profile");
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
        <AuthorModal
          onClose={() => setShowModal(false)}
          onLogin={() => handleNavigate("/auth/login")}
          onRegister={() => handleNavigate("/auth/register")}
        />
      )}
    </footer>
  );
}
