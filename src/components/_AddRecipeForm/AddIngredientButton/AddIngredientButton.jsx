import css from "./AddIngredientButton.module.css";

export default function AddIngredientButton({ onClick }) {
  return (
    <button
      type="button"
      name="Add Ingredient"
      onClick={onClick}
      className={css.addIngredient}
    >
      Add Ingredient
    </button>
  );
}
