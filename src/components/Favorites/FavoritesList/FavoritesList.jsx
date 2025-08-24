import style from "./FavoritesList.module.css";

import { useSelector, useDispatch } from "react-redux";

import {
  selectFavoritesRecipes,
  selectFavoritesLoading,
  selectFavoritesPage,
  selectFavoritesPerPage,
  selectFavoritesHasMore,
} from "../../../redux/recipes/selectors";

import { RecipeCard } from "../../RecipeCard/RecipeCard";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.";
import { useEffect } from "react";
import { fetchFavoriteRecipes } from "../../../redux/favorites/operation";

export default function FavoritesList() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoritesRecipes);
  const isLoading = useSelector(selectFavoritesLoading);
  const page = useSelector(selectFavoritesPage);
  const perPage = useSelector(selectFavoritesPerPage);
  const hasMore = useSelector(selectFavoritesHasMore);

  useEffect(() => {
    if (favorites.length === 0) {
      dispatch(fetchFavoriteRecipes({ page, perPage }));
    }
  }, [dispatch, favorites, page, perPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFavoriteRecipes({ page, perPage }));
    }
  };

  return (
    <>
      <ul className={style.list}>
        {favorites.map((favorite) => (
          <li className={style.item} key={favorite._id}>
            <RecipeCard
              dishPhoto={favorite.thumb}
              recipeName={favorite.title}
              recipeDescription={favorite.description}
              recipeTime={favorite.time}
            />
          </li>
        ))}
      </ul>

      <div>
        {hasMore && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        )}
      </div>
    </>
  );
}
