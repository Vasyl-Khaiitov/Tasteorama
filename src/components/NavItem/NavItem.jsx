import { NavLink } from "react-router-dom";
// import css from "./NavItem.module.css";

export default function NavItem({
  to,
  children,
  className,
  activeClassName,
  onClick,
}) {
  const getClasses = ({ isActive }) =>
    isActive ? `${className} ${activeClassName || ""}`.trim() : className;

  const handleClick = () => {
    if (onClick) onClick(); // наприклад, закриває модалку
  };

  return (
    <NavLink to={to} className={getClasses} onClick={handleClick}>
      {children}
    </NavLink>
  );
}
