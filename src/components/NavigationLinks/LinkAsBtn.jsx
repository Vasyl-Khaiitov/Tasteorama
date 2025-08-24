import { useSelector } from "react-redux";
import css from "./LinkAsBtn.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import NavItem from "../NavItem/NavItem";

export default function LinkAsBtn({ onLinkClick, fullWidth = false }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const btnClass = `${css.linkAsBtn} ${fullWidth ? css.fullWidth : ""}`;
  return (
    <NavItem
      to={isLoggedIn ? "/add-recipe" : "/auth/register"}
      className={btnClass}
      activeClassName={css.activeAsBtn}
      onClick={onLinkClick}
    >
      {" "}
      {isLoggedIn ? "Add Recipe" : "Register"}
    </NavItem>
  );
}
