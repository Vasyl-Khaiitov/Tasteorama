import style from "./FavoritesSection.module.css";
import FavoritesList from "../FavoritesList/FavoritesList";
import { useSelector } from "react-redux";
import {
  selectFavoritesLoading,
  selectFavoritesRecipes,
} from "../../redux/favorites/selectors";
import Loader from "../Loader/Loader";
import EmptyRecipesWindow from "../EmptyRecipesWindow/EmptyRecipesWindow";

export default function FavoritesSection() {
  const isLoading = useSelector(selectFavoritesLoading);
  const favoriteRecipes = useSelector(selectFavoritesRecipes);
  return (
    <section className={style}>
      {isLoading && <Loader />}
      {favoriteRecipes.length === 0 && (
        <div className={style.errorWrapper}>
          <EmptyRecipesWindow />
        </div>
      )}
      <FavoritesList />
    </section>
  );
}
