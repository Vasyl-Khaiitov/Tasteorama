import style from "./FavoritesList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.";
import {
  selectFavoritesRecipes,
  selectFavoritesLoading,
  selectFavoritesPerPage,
  selectFavoritesHasMore,
} from "../../redux/favorites/selectors";
import { useEffect, useState } from "react";
import { fetchFavoriteRecipes } from "../../redux/favorites/operation";
import { selectToken } from "../../redux/auth/selectors";
import { resetFavorites } from "../../redux/favorites/slice";

export default function FavoritesList() {
  const dispatch = useDispatch();
  const [localPage, setLocalPage] = useState(1);

  const favorites = useSelector(selectFavoritesRecipes); // массив объектов
  const isLoading = useSelector(selectFavoritesLoading);
  const perPage = useSelector(selectFavoritesPerPage);
  const hasMore = useSelector(selectFavoritesHasMore);
  const token = useSelector(selectToken);
  const userId = useSelector((state) => state.auth.user?.id);

  // Скидаємо при першому завантаженні
  useEffect(() => {
    dispatch(resetFavorites());
    setLocalPage(1);
  }, [dispatch]);

  // Завантаження сторінки
  useEffect(() => {
    if (userId) {
      dispatch(
        fetchFavoriteRecipes({
          userId,
          token,
          page: localPage,
          perPage,
        })
      );
    }
  }, [dispatch, userId, token, localPage, perPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore && userId) {
      setLocalPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <h2>Favorites</h2>
      <ul className={style.list}>
        {favorites.map((favorite) => (
          <li className={style.item} key={favorite._id}>
            <RecipeCard
              recipeId={favorite._id} // обязательно передаем id
              recipeName={favorite.title}
              recipeDescription={favorite.description}
              dishPhoto={favorite.thumb}
              recipeTime={favorite.time}
            />
          </li>
        ))}
      </ul>

      {hasMore && <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />}

      {/* {hasMore && (
        <div className={style.loadMoreWrapper}>
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        </div>
      )} */}
    </>
  );
}
