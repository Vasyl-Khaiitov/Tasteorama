import style from "./FavoritesList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.";
import {
  selectFavoritesRecipes,
  selectFavoritesLoading,
  selectFavoritesPerPage,
  selectFavoritesHasMore,
  selectFavoritesTotalRecipes,
} from "../../redux/favorites/selectors";
import { useEffect, useState } from "react";
import { fetchFavoriteRecipes } from "../../redux/favorites/operation";
import { selectToken } from "../../redux/auth/selectors";
import { resetFavorites } from "../../redux/favorites/slice";
import RemoveFavoriteButton from "../RemoveFavoriteButton/RemoveFavoriteButton";

export default function FavoritesList() {
  const dispatch = useDispatch();
  const [localPage, setLocalPage] = useState(1);

  const favorites = useSelector(selectFavoritesRecipes); // массив объектов
  const isLoading = useSelector(selectFavoritesLoading);
  const perPage = useSelector(selectFavoritesPerPage);
  const hasMore = useSelector(selectFavoritesHasMore);
  const token = useSelector(selectToken);
  const userId = useSelector((state) => state.auth.user?.id);
  const total = useSelector(selectFavoritesTotalRecipes);

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
  console.log("🚀 ~ total:", total);

  return (
    <>
      <p className={style.total}>{total} recipes</p>
      <ul className={style.list}>
        {favorites.map((favorite) => (
          <li className={style.item} key={favorite._id}>
            <RecipeCard
              recipeId={favorite._id} // обязательно передаем id
              recipeName={favorite.title}
              recipeDescription={favorite.description}
              dishPhoto={favorite.thumb}
              recipeTime={favorite.time}
              customButton={<RemoveFavoriteButton recipeId={favorite._id} />}
            />
          </li>
        ))}
      </ul>
      <div className={style.loadMoreWrapper}>
        {hasMore && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        )}
      </div>
    </>
  );
}
