import css from "./Header.module.css";
import Navigation from "../Navigation/Navigation";
import Logo from "../logo/Logo";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <Logo />
      <div className={css.wraper}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </div>
    </header>
  );
}
