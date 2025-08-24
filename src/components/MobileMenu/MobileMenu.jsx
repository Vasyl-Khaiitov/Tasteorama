import NavigationLinks from "../NavigationLinks/NavigationLinks";
import Icon from "../../shared/Icon";
import css from "./MobileMenu.module.css";
import Logo from "../logo/Logo";
import UserMenu from "../UserMenu/UserMenu";
import NavItem from "../NavItem/NavItem";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import LinkAsBtn from "../NavigationLinks/LinkAsBtn";

export default function MobileMenuModal({ onClose }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.overlay}>
      <div className={css.container}>
        <div className={css.menu}>
          <Logo onClick={onClose} />
          <button onClick={onClose} className={css.closeBtn}>
            <Icon name="close" classname={css.closeBtnIcon} />
          </button>
        </div>
        <div className={css.navigation}>
          <NavigationLinks onLinkClick={onClose} />
          {isLoggedIn && (
            <div className={css.userMenu}>
              <UserMenu onLogout={onClose} />
            </div>
          )}
          <LinkAsBtn
            onLinkClick={onClose}
            fullWidth
            className={css.linkAsBtn}
          />
        </div>
      </div>
    </div>
  );
}
