import css from "./Logo.module.css";

import Icon from "../../shared/Icon";
import { NavLink, useNavigate } from "react-router-dom";
export default function Logo({ onClick }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate("/");
  };
  return (
    <>
      <button type="button" onClick={handleClick} className={css.linkBtn}>
        <Icon name="logo" classname={css.logoIcon} />
        <p className={css.text}>Tasteorama</p>
      </button>
    </>
  );
}
