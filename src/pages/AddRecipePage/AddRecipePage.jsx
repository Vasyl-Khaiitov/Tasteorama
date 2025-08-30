import css from "./AddRecipePage.module.css";
import AddRecipeForm from "../../components/_AddRecipeForm/_AddRecipeForm";

export default function AddRecipePage() {
  return (
    <div>
      <h2 className={css.title}>Add Recipe</h2>

      <AddRecipeForm />
    </div>
  );
}
