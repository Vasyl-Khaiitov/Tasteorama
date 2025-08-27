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
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.";
import { selectNameFilter } from "../../redux/filter/selectors";
import MatchErrWindow from "../MatchErrWindow/MatchErrWindow";
import { changeRecipeSearch } from "../../redux/filter/slice";
import { resetRecipes, setPage } from "../../redux/recipes/slice";
import ButtonUp from "../../common/ButtonUp/ButtonUp";

export function RecipesList() {
  const dispatch = useDispatch();

  const recipes = useSelector(SelectRecipes);
  const isLoading = useSelector(SelectRecipesIsLoading);
  const hasMore = useSelector(SelectRecipesHasMore);
  const page = useSelector(SelectRecipesPage);
  const perPage = useSelector(SelectRecipesPerPage);
  const totalRecepies = useSelector(SelectTotalRecepies);

  const search = useSelector(selectNameFilter);

  useEffect(() => {
    // додала умову по пошуку
    if (recipes.length === 0 && !search) {
      dispatch(fetchRecipes({ page, perPage }));
    }
  }, [dispatch, recipes.length, search, page, perPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      dispatch(setPage(nextPage));
      dispatch(loadMoreRecipes({ page: nextPage, title: search }));
    }
  };

  return (
    <>
      <div>{totalRecepies} recipes</div>


      {recipes.length === 0 && !isLoading ? (
        search ? (
          /* якщо був пошук і нічого не знайдено */
          <MatchErrWindow
            onReset={() => {
              dispatch(changeRecipeSearch("")); // очищаємо фільтр
              dispatch(resetRecipes()); // чистимо список
              dispatch(fetchRecipes({ page: 1, perPage })); // знову беремо всі
            }}
          />
        ) : null
      ) : (
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
      )}

      <ButtonUp />

      <div className={style.loadMoreWrapper}>
        {hasMore && !isLoading && recipes.length > 0 && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        )}
      </div>
    </>
  );
}
