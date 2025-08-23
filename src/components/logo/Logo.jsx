import css from "./Logo.module.css";

import Icon from "../../shared/Icon";
export default function Logo() {
  return (
    <div className={css.container}>
      <Icon name={"logo"} classname={css.logoIcon} />

      <p className={css.text}>Tasteorama</p>
    </div>
  );
}
