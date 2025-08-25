import { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchRecipesById } from "../../redux/recipes/operations.js";
import {
  selectRecipesError,
  selectRecipesIsLoadingCurrentRecipe,
} from "../../redux/recipes/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";
import { fetchIngredients } from "../../redux/ingredients/operations.js";
import { fetchCategories } from "../../redux/categories/operations.js";

const RecipeDetails = lazy(() =>
  import("../../components/RecipeView/RecipeDetails/RecipeDetails.jsx")
);

const RecipeViewPage = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const error = useSelector(selectRecipesError);
  const isLoading = useSelector(selectRecipesIsLoadingCurrentRecipe);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipesById(recipeId));
      dispatch(fetchIngredients());
      dispatch(fetchCategories());
    }
  }, [dispatch, recipeId]);

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <Suspense fallback={<Loader />}>
      <RecipeDetails />
    </Suspense>
  );
};

export default RecipeViewPage;
