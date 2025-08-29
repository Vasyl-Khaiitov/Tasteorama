import style from "./RecipesSection.module.css"
import { RecipesList } from "../RecipesList/RecipesList";
import { useSelector } from "react-redux";
import { SelectRecipesIsLoading } from "../../redux/recipes/selectors";
import Loader from "../Loader/Loader";
import TitleMainPage from "../TitleMainPage/TitleMainPage";

import Filters from "../Filters/Filters";


export default function RecipesSection() {
  const isLoading = useSelector(SelectRecipesIsLoading);

  return (
    <>

      <TitleMainPage />
       <div className={style.filterContainer}>
        
          <Filters />
  
      </div>
      {isLoading ? <Loader /> : <RecipesList />}

    </>
  );
}
