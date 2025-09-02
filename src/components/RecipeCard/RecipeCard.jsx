import style from "./RecipeCard.module.css";
import Icon from "../../shared/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../redux/favorites/operation";

export function RecipeCard({
  dishPhoto,
  recipeName,
  recipeDescription,
  recipeTime,
  recipeId,
  hideFavoriteButton = false,
  fullWidthBtn = false,
  customButton,
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //  const isFavorite = useSelector(state =>
  //     recipeId ? state.favorites.items.includes(recipeId.toString()) : false
  //   );
  const isFavorite = useSelector((state) =>
    recipeId ? state.favorites.items.some((r) => r._id === recipeId) : false
  );

  // const favoriteIds = useSelector(state => state.favorites.items);
  //   console.log("Current favorite IDs:", favoriteIds);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className={style.card}>
      <img className={style.img} src={dishPhoto} alt={recipeName} />

      <div className={style.header}>
        <h3 className={style.title}>{recipeName}</h3>
        <div className={style.containerTime}>
          <p className={style.time}>
            <Icon name="clock" classname={style.icon} /> {recipeTime}
          </p>
        </div>
      </div>

      <div className={style.descrContainer}>
        <p className={style.description}>{recipeDescription}</p>
        <p className={style.cals}>- cals</p>
      </div>

      <div className={style.btnContainer}>
        <NavLink
          to={`/recipes/${recipeId}`}
          className={`${style.btn} ${fullWidthBtn ? style.fullWidthBtn : ""}`}
        >
          Learn more
        </NavLink>

        {!hideFavoriteButton &&
          (customButton ? (
            customButton
          ) : (
            <button
              type="button"
              className={`${style.btnIcon} ${isFavorite ? style.active : ""}`}
              onClick={handleFavoriteClick}
            >
              <Icon name="flag" classname={style.icon} />
            </button>
          ))}
      </div>

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
