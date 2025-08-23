import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Button from "../../common/Button/Button";

export default function Navigation() {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.container}>
      {/* Спільна вкладка */}
      <NavLink className={getNavLinkClass} to="/">
        Recipes
      </NavLink>

      {!isLoggedIn && (
        <>
          <NavLink className={getNavLinkClass} to="/auth/:authType">
            Log In
          </NavLink>
          <NavLink to="/auth/register">
            <button type="button" className={css.button}>
              Register
            </button>
            <Button
              type="button"
              styleType="transparent"
              paddingsY={8}
              name="Create account"
            />
          </NavLink>
        </>
      )}

      {/* Якщо авторизований */}

      {isLoggedIn && (
        <>
          <NavLink className={getNavLinkClass} to="/my-profile">
            My Profile
          </NavLink>
          <button type="button" className={css.button}>
            Add Recipe
          </button>
        </>
      )}
    </nav>
  );
}
