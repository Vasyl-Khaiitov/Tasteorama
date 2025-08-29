import css from "./UserMenu.module.css";
import UserInfo from "../UserInfo/UserInfo";
import { useDispatch } from "react-redux";
import { fetchLogoutUser } from "../../redux/auth/operations";
import Icon from "../../shared/Icon";
import { useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";
import { resetRecipes, setPage } from "../../redux/recipes/slice";

export default function UserMenu() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmLogout = () => {
    dispatch(fetchLogoutUser());
    dispatch(resetRecipes());
    dispatch(setPage(1));
    handleCloseModal();
  };

  return (
    <>
      <UserInfo />
      <div className={css.divider}></div>
      <button
        type="button"
        onClick={handleOpenModal}
        className={css.logoutBtn}
        aria-label="Log out"
      >
        <Icon name={"logout"} classname={css.logoutIcon} />
      </button>

      {showModal && (
        <LogoutModal
          onConfirm={handleConfirmLogout}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
}
