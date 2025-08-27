import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.";
import {
  selectFavoritesRecipes,
  selectFavoritesLoading,
  selectFavoritesPage,
  selectFavoritesPerPage,
  selectFavoritesHasMore,
} from "../../redux/favorites/selectors";
import { fetchFavoriteRecipes } from "../../redux/favorites/operation";
import { selectToken } from "../../redux/auth/selectors";
import style from "./FavoritesList.module.css";

export default function FavoritesList() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoritesRecipes); // массив объектов
  const isLoading = useSelector(selectFavoritesLoading);
  const page = useSelector(selectFavoritesPage);
  const perPage = useSelector(selectFavoritesPerPage);
  const hasMore = useSelector(selectFavoritesHasMore);
  const token = useSelector(selectToken);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteRecipes({ userId, token, page, perPage }));
    }
  }, [dispatch, userId, token, page, perPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore && userId) {
      dispatch(fetchFavoriteRecipes({ userId, token, page, perPage }));
    }
  };

  return (
    <>
      <h2>Favorites</h2>
      <ul className={style.list}>
        {favorites.map((favorite) => (
          <li className={style.item} key={favorite._id}>
            <RecipeCard
              recipeId={favorite._id}       // обязательно передаем id
              recipeName={favorite.title}
              recipeDescription={favorite.description}
              dishPhoto={favorite.thumb}
              recipeTime={favorite.time}
            />
          </li>
        ))}
      </ul>

      {/* {hasMore && (
        <div className={style.loadMoreWrapper}>
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        </div>
      )} */}
    </>
  );
}
