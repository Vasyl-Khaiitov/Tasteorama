import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenuWrapper from "../UserMenu/UserMenuWraper";
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import Icon from "../../shared/Icon";

import { useState } from "react";
import MobileMenuModal from "../MobileMenu/MobileMenu";
import LinkAsBtn from "../NavigationLinks/LinkAsBtn";

export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <div className={css.wraper}>
          <NavigationWrapper />
          <LinkAsBtn />

          {isLoggedIn && <UserMenuWrapper />}
        </div>
        <button className={css.burgerBtn} onClick={openMenu}>
          <Icon name={"burger"} classname={css.burgerBtnIcon} />
        </button>
      </div>
      {isMenuOpen && <MobileMenuModal onClose={closeMenu} />}
    </header>
  );
}
