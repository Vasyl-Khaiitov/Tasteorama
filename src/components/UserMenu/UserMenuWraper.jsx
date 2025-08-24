import UserMenu from "./UserMenu";
import css from "./UserMenuWraper.module.css";

export default function UserMenuWrapper() {
  return (
    <div className={css.container}>
      <UserMenu />
    </div>
  );
}
