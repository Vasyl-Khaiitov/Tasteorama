import css from "./UserMenu.module.css";
import UserInfo from "../UserInfo/UserInfo";
import { useDispatch } from "react-redux";
import { fetchLogoutUser } from "../../redux/auth/operations";
import Icon from "../../shared/Icon";

export default function UserMenu({ onLogout }) {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(fetchLogoutUser());
    if (onLogout) {
      onLogout();
    }
  };
  return (
    <>
      <UserInfo />
      <div className={css.divider}></div>
      <button
        type="button"
        onClick={handleLogOut}
        className={css.logoutBtn}
        aria-label="Log out"
      >
        <Icon name={"logout"} classname={css.logoutIcon} />
      </button>
    </>
  );
}
