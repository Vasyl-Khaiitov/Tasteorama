// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selectIsLoggedIn, selectUser } from "../../../redux/auth/selectors";
import { selectCurrentRecipe } from "../../../redux/recipes/selectors";
import styles from "./RecipeDetails.module.css";
import NotFound from "../../NotFound/NotFound";
import clsx from "clsx";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import IngredientsList from "../IngredientsList/IngredientsList";
import Steps from "../Steps/Steps";
import { useSelector } from "react-redux";
import Icon from "../../../shared/Icon";
import About from "../About/About";
import Button from "../../../common/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../../redux/auth/selectors";
import { useState } from "react";
import AuthModal from "../../AuthModal/AuthModal";
import { useCategoryManager } from "../../_AddRecipeForm/useCategoryManager";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../../redux/favorites/operation";

export default function RecipeDetails({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const { recipeId } = useParams();

  const recipe = useSelector(selectCurrentRecipe);

  const { categories } = useCategoryManager();

  if (!recipe) return <NotFound />; // ✅ спочатку перевірка

  const categoryName =
    categories.length > 0
      ? categories.find((c) => c._id === recipe.category)?.name ||
        recipe.category ||
        "Unknown"
      : "Loading...";

  const isOwner = user?.id === recipe.owner; // ✅ тепер можна

  const isFavorite = useSelector((state) =>
    recipeId ? state.favorites.items.some((r) => r._id === recipeId) : false
  );

  const [showModal, setShowModal] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    if (!isFavorite) {
      dispatch(addToFavorites(recipeId));
    } else {
      dispatch(deleteFromFavorites(recipeId));
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowModal(false);
  };

  console.log(recipe, user);

  return (
    <>
      <div className={styles.wrapperImgh}>
        <div className={styles.containerImg}>
          <img
            src={recipe.thumb || recipe.imageUrl}
            alt={recipe.title}
            loading="lazy"
          />
        </div>
        <h1 className={styles.title}>{recipe.title}</h1>
      </div>
      <div className={styles.recipeLayout}>
        <div className={styles.generalInfobutton}>
          <GeneralInfo
            category={categoryName ?? recipe.category ?? "N/N"}
            time={recipe.time}
            calories={recipe.cals ?? "N/N"}
          />

          {!isOwner && (
            <button
              type="button"
              className={`${styles.saveButton} ${
                isFavorite ? styles.active : ""
              }`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? "Unsave" : "Save"}{" "}
              {isFavorite ? (
                <Icon
                  name="flag"
                  classname={clsx(styles.icon, styles.iconSavedFavorite)}
                />
              ) : (
                <Icon name="flag" classname={clsx(styles.icon)} />
              )}
            </button>
          )}
        </div>
        <div className={styles.leftContent}>
          <About description={recipe.description} />
          <IngredientsList ingredients={recipe.ingredients} />
          <Steps instructions={recipe.instructions} />
        </div>
      </div>

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
