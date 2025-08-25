import { RecipesList } from "../RecipesList/RecipesList";
import { useSelector } from "react-redux";
import { SelectRecipesIsLoading } from "../../redux/recipes/selectors";
import Loader from "../Loader/Loader";

export default function RecipesSection() {
  const isLoading = useSelector(SelectRecipesIsLoading);

  return (
    <>
      <h2> Recipes </h2>
      {isLoading ? <Loader /> : <RecipesList />}
    </>
  );
}
