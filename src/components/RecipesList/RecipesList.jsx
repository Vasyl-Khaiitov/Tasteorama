import style from "./RecipesList.module.css";

import { useSelector, useDispatch } from "react-redux";
import {
  SelectRecipes,
  SelectRecipesIsLoading,
  SelectRecipesPage,
  SelectRecipesPerPage,
  SelectRecipesHasMore,
  SelectTotalRecepies,
} from "../../redux/recipes/selectors";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { useEffect } from "react";
import { fetchRecipes, loadMoreRecipes } from "../../redux/recipes/operations";
import ButtonUp from "../../common/ButtonUp/ButtonUp.jsx";
import { setPage } from "../../redux/recipes/slice";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn..jsx";
import { selectNameFilter } from "../../redux/filter/selectors.js";

export function RecipesList() {
  const dispatch = useDispatch();

  const recipes = useSelector(SelectRecipes);
  const isLoading = useSelector(SelectRecipesIsLoading);
  const hasMore = useSelector(SelectRecipesHasMore);
  const page = useSelector(SelectRecipesPage);
  const perPage = useSelector(SelectRecipesPerPage);
  const totalRecepies = useSelector(SelectTotalRecepies);
  const filterName = useSelector(selectNameFilter);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes({ page, perPage }));
    }
  }, [dispatch, page, perPage, recipes.length]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      dispatch(setPage(nextPage));
      dispatch(loadMoreRecipes({ page: nextPage, title: filterName }));
    }
  };

  return (
    <>
      <div>{totalRecepies} recipes</div>
      <ul className={style.list}>
        {recipes.map((recipe) => (
          <li className={style.item} key={recipe._id}>
            <RecipeCard
              dishPhoto={recipe.thumb}
              recipeName={recipe.title}
              recipeDescription={recipe.description}
              recipeTime={recipe.time}
              recipeId={recipe._id}
            />
          </li>
        ))}
      </ul>

      <ButtonUp />

      <div className={style.loadMoreWrapper}>
        {hasMore && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        )}
      </div>
    </>
  );
}
