import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromFavorites } from "../../redux/favorites/operation";
import Icon from "../../shared/Icon";
import style from "./RemoveFavoriteButton.module.css";
import { toast } from "react-toastify";

export default function RemoveFavoriteButton({ recipeId }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  const isFavorite = useSelector((state) =>
    recipeId ? state.favorites.items.some((r) => r._id === recipeId) : false
  );
  useEffect(() => {
    return () => {
      isMounted.current = false; // захист від setState після unmount
    };
  }, []);

  const handleRemove = async () => {
    try {
      setLoading(true);
      await dispatch(deleteFromFavorites(recipeId)).unwrap(); // передаємо лише рядок
      if (isMounted.current) {
        toast.success("Рецепт видалено з улюблених");
      }
    } catch (err) {
      console.error("Помилка при видаленні:", err);
      if (isMounted.current) {
        toast.error("Не вдалося видалити рецепт з улюблених");
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  return (
    <button
      className={`${style.btnIcon} ${isFavorite ? style.active : ""}`}
      onClick={handleRemove}
      disabled={loading}
      aria-label="Remove from favorites"
    >
      <Icon name="flag" classname={style.icon} />
    </button>
  );
}
