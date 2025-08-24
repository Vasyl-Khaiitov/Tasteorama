import css from "./NavigationWrapper.module.css";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

export default function NavigationWrapper() {
  return (
    <nav className={css.container}>
      <NavigationLinks />
    </nav>
  );
}
