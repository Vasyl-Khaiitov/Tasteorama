import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const location = useLocation();

  if (location.pathname === "/profile") {
    return <Navigate to="/profile/owner" replace />;
  }

  return (
    <>
      <h2>My profile</h2>
      <ul className={css.navList}>
        <li>
          <NavLink
            to="/profile/owner"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            My Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/favorites"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Saved Recipes
          </NavLink>
        </li>
      </ul>

      {/* 🔑 Тут відображаються вкладені маршрути */}
      <Outlet />
    </>
  );
}
