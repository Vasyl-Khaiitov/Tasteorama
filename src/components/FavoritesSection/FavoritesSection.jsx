import style from "./FavoritesSection.module.css";
import FavoritesList from "../FavoritesList/FavoritesList";
import { useSelector } from "react-redux";
import { selectFavoritesLoading } from "../../redux/favorites/selectors";
import Loader from "../Loader/Loader";

export default function FavoritesSection() {
  const isLoading = useSelector(selectFavoritesLoading);
  return (
    <section className={style}>
      {isLoading && <Loader />}
      <FavoritesList />
    </section>
  );
}
