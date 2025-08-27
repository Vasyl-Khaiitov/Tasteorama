import { RecipesList } from "../RecipesList/RecipesList";
import { useSelector } from "react-redux";
import { SelectRecipesIsLoading } from "../../redux/recipes/selectors";
import Loader from "../Loader/Loader";
import TitleMainPage from "../TitleMainPage/TitleMainPage";

export default function RecipesSection() {
  const isLoading = useSelector(SelectRecipesIsLoading);

  return (
    <>
      <TitleMainPage />
      {isLoading ? <Loader /> : <RecipesList />}
    </>
  );
}
