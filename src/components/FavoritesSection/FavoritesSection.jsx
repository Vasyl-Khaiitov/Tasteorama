import style from "./FavoritesSection.module.css";
import FavoritesList from "../FavoritesList/FavoritesList";
// import { useSelector } from "react-redux";
// import { selectFavoritesLoading } from "../../redux/favorites/selectors";

export default function FavoritesSection() {
  //   const isLoading = useSelector(selectFavoritesLoading);

  return (
    <section className={style}>
      <h2>Hellow recipes favorites</h2>
      {/* {isLoading ? "Request in progress..." : <FavoritesList />} */}
      <FavoritesList />
    </section>
  );
}
