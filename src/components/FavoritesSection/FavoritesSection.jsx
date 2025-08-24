import style from "./FavoritesSection.module.css";

import { FavoritesList } from "../FavoritesList/FavoritesSection";
import { useSelector } from "react-redux";
import { SelectRecipesIsLoading } from "../../redux/recipes/selectors";

export default function Favorites() {
  const isLoading = useSelector(SelectRecipesIsLoading);

  return (
    <section className={style}>
      {isLoading ? "Request in progress..." : <FavoritesList />}
    </section>
  );
}
