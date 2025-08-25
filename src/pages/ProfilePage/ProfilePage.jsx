import Owner from "../../components/Owner/Owner.jsx";
import Favorites from "../../components/Favorites/Favorites.jsx";
import NavItem from "../../components/NavItem/NavItem.jsx";
import css from "./ProfilePage.module.css";
import { useState } from "react";

export default function ProfilePage() {
  const [isRecipe, setIsRecipes] = useState(false);

  return (
    <>
      <NavItem
        to="/profile/owner"
        className={css.link}
        activeClassName={css.active}
        onClick={() => setIsRecipes(false)}
      >
        Recipes
      </NavItem>
      <NavItem
        to="/profile/favorites"
        className={css.link}
        activeClassName={css.active}
        onClick={() => setIsRecipes(true)}
      >
        Favorites
      </NavItem>
      {!isRecipe ? <Owner /> : <Favorites />}
    </>
  );
}
