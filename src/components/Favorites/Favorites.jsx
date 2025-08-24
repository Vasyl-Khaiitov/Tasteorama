import style from "./Favorites.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFavoritesLoading,
  selectFavoritesRecipes,
} from "../../redux/favorites/selectors";
import { fetchFavoritesRecipes } from "../../redux/favorites/operation";
import { useEffect } from "react";
import FavoriteCards from "../FavoriteCard/FavoriteCard";

export default function Favorites() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFavoritesLoading);
  const favorites = useSelector(selectFavoritesRecipes);
  useEffect(() => {
    dispatch(fetchFavoritesRecipes());
  }, [dispatch]);
  return (
    <>
      <div className={style}>
        {isLoading ? (
          <FavoriteCards favorites={favorites} />
        ) : (
          "Request in progress..."
        )}
      </div>
    </>
  );
}
