import style from "./FavoritesList.module.css";

import { useSelector, useDispatch } from "react-redux";

import {
  selectFavoritesRecipes,
  selectFavoritesLoading,
  selectFavoritesPage,
  selectFavoritesPerPage,
  selectFavoritesHasMore,
} from "../../redux/favorites/selectors";

import { RecipeCard } from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.";
import { useEffect } from "react";
import { fetchFavoriteRecipes } from "../../redux/favorites/operation";
import { selectToken } from "../../redux/auth/selectors";

export default function FavoritesList() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoritesRecipes);
  const isLoading = useSelector(selectFavoritesLoading);
  const page = useSelector(selectFavoritesPage);
  const perPage = useSelector(selectFavoritesPerPage);
  const hasMore = useSelector(selectFavoritesHasMore);

  const token = useSelector(selectToken);
  const userId = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    if (userId) {
      dispatch(
        fetchFavoriteRecipes({
          userId,
          token,
          page,
          perPage,
        })
      );
    }
  }, [dispatch, userId, token, page, perPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore && userId) {
      dispatch(fetchFavoriteRecipes({ userId, page, perPage }));
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
