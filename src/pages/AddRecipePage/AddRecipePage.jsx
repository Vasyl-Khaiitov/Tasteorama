import React from "react";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import css from "./AddRecipePage.module.css";

export default function AddRecipePage() {
  return (
    <div>
      <h2 className={css.title}>Add Recipe</h2>

      <AddRecipeForm />
    </div>
  );
}
