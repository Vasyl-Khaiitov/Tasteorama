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
import { fetchRecipes } from "../../redux/recipes/operations";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.";

export function RecipesList() {
  const dispatch = useDispatch();

  const recipes = useSelector(SelectRecipes);
  const isLoading = useSelector(SelectRecipesIsLoading);
  const hasMore = useSelector(SelectRecipesHasMore);
  const page = useSelector(SelectRecipesPage);
  const perPage = useSelector(SelectRecipesPerPage);
  const totalRecepies = useSelector(SelectTotalRecepies);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes({ page, perPage }));
    }
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchRecipes({ page, perPage }));
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

      <div className={style.loadMoreWrapper}>
        {hasMore && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        )}
      </div>
    </>
  );
}
