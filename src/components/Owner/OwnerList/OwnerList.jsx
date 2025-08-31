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
import { selectCreatedRecipesList } from "../../../redux/addRecipes/selectors.js";
import { RecipeCard } from "../../RecipeCard/RecipeCard.jsx";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn..jsx";
import { useEffect } from "react";
import { fetchOwnRecipes } from "../../../redux/ownRecipes/operations.js";

export default function OwnerList() {
  const dispatch = useDispatch();

  const total = useSelector(selectOwnRecipesTotal);
  const ownRecipes = useSelector(selectOwnRecipes);
  const createdRecipes = useSelector(selectCreatedRecipesList); // <- сюда
  const isLoading = useSelector(selectOwnRecipesLoading);
  const page = useSelector(selectOwnRecipesPage);
  const perPage = useSelector(selectOwnRecipesPerPage);
  const hasMore = useSelector(selectOwnRecipesHasMore);

  // объединяем без дублей по _id
  const allRecipes = [...createdRecipes, ...ownRecipes].filter(
    (recipe, index, self) => index === self.findIndex(r => r._id === recipe._id)
  );

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
      <p className={style.total}>{allRecipes.length} recipes</p>
      <ul className={style.list}>
        {allRecipes.map((recipe) => (
          <li className={style.item} key={recipe._id}>
            <div className={style.cardWrapper}>
              <RecipeCard
                recipeId={recipe._id}
                dishPhoto={recipe.thumb}
                recipeName={recipe.title}
                recipeDescription={recipe.description}
                recipeTime={recipe.time}
                hideFavoriteButton
                fullWidthBtn
              />
            </div>
          </li>
        ))}
      </ul>

      <div className={style.loadMoreWrapper}>
        {allRecipes.length !== 0 && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        )}
      </div>
    </>
  );
}