import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import NavItem from "../NavItem/NavItem";
import css from "./NavigationLinks.module.css";

export default function Navigation({ onLinkClick }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      {/* Спільна вкладка */}
      <NavItem
        to="/"
        className={css.link}
        activeClassName={css.active}
        onClick={onLinkClick} // закриває модалку, якщо передано
      >
        Recipes
      </NavItem>

      {!isLoggedIn && (
        <>
          <NavItem
            to="/auth/login"
            className={css.link}
            activeClassName={css.active}
            onClick={onLinkClick}
          >
            Log In
          </NavItem>
        </>
      )}
      {isLoggedIn && (
        <NavItem
          to="/profile"
          className={css.link}
          activeClassName={css.active}
          onClick={onLinkClick}
        >
          My Profile
        </NavItem>
      )}
    </>
  );
}
