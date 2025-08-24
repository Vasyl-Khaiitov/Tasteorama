import style from "./RecipesSection.module.css"

import { RecipesList } from "../RecipesList/RecipesList";
import { useSelector } from "react-redux";
import { SelectRecipesIsLoading } from "../../redux/recipes/selectors";


export default function RecipesSection() {

   
    const isLoading = useSelector(SelectRecipesIsLoading);

   

    return (
        <section className={style.container}>
            <h2> Recipes </h2>
            { isLoading ? <p>Loading...</p> : <RecipesList />}
        </section>
    )
}