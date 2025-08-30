import Select from "../Select/Select";
import Input from "../../../common/Input/Input";
import { useIngredientManager } from "../useIngredientManager";
import { ErrorMessage } from "formik";

export default function IngredientsSection({ setFieldValue }) {
  const {
    ingredients,
    ingredientInput,
    ingredientList,
    handleSelectChange,
    handleInputChange,
    handleAddIngredient,
    handleDelete,
  } = useIngredientManager(setFieldValue);

  return (
    <>
      <Select
        name="ingredient"
        labelText="Ingredient"
        options={ingredientList}
        value={ingredientInput.ingredient?._id || ""}
        onChange={handleSelectChange}
      />
      <ErrorMessage name="ingredient">
        one of ingredient collection
      </ErrorMessage>
      <Input
        name="measure"
        labelText="Amount"
        value={ingredientInput.measure}
        onChange={handleInputChange}
      />

      <button type="button" onClick={handleAddIngredient}>
        Add Ingredient
      </button>

      <ul>
        {ingredients.map((ing) => (
          <li key={ing.id}>
            {ing.name} — {ing.measure}
            <button type="button" onClick={() => handleDelete(ing.id)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
