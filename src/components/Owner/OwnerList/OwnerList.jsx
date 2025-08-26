import style from "./OwnerList.module.css";

import { useSelector, useDispatch } from "react-redux";

import {
  selectOwnRecipes,
  selectOwnRecipesLoading,
  selectOwnRecipesPage,
  selectOwnRecipesPerPage,
    selectOwnRecipesHasMore,
    selectOwnRecipesTotal,
} from "../../../redux/ownRecipes/selectors.js";

import { Recipe Card } from "../../RecipeCard/RecipeCard.jsx";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn..jsx";
import { useEffect } from "react";
import { fetchOwnRecipes } from "../../../redux/ownRecipes/operations.js";

export default function OwnerList() {
  const dispatch = useDispatch();

  const total = useSelector(selectOwnRecipesTotal);
  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectOwnRecipesLoading);
  const page = useSelector(selectOwnRecipesPage);
  const perPage = useSelector(selectOwnRecipesPerPage);
  const hasMore = useSelector(selectOwnRecipesHasMore);

  useEffect(() => {
    if (ownRecipes.length === 0) {
      dispatch(fetchOwnRecipes({ page, perPage }));
    }
  }, [dispatch, ownRecipes, page, perPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchOwnRecipes({ page, perPage }));
    }
  };

  return (
      <>
          <p>{total} recipes</p>
      <ul className={style.list}>
        {ownRecipes.map((recipe) => (
          <li className={style.item} key={recipe._id}>
            <RecipeCard
              dishPhoto={recipe.thumb}
              recipeName={recipe.title}
              recipeDescription={recipe.description}
              recipeTime={recipe.time}
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
