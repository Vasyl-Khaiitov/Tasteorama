import Owner from "../../components/Owner/Owner.jsx";
import Favorites from "../../components/Favorites/Favorites.jsx";
import NavItem from "../../components/NavItem/NavItem.jsx";
import css from "./ProfilePage.module.css";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProfilePage() {
  const [isRecipe, setIsRecipes] = useState(false);

  const location = useLocation();

  if (location.pathname === "/profile") {
    return <Navigate to="/profile/owner" replace />;
  }

  return (
    <>
      <h2>My profile</h2>
      <ul className={css.navList}>
      <NavItem
        to="/profile/owner"
        className={css.link}
        activeClassName={css.active}
        onClick={() => setIsRecipes(false)}
      >
        My Recipes
      </NavItem>
      <NavItem
        to="/profile/favorites"
        className={css.link}
        activeClassName={css.active}
        onClick={() => setIsRecipes(true)}
      >
        Saved Recipes
        </NavItem>
        </ul>
      {!isRecipe ? <Owner /> : <Favorites />}
    </>
  );
}
