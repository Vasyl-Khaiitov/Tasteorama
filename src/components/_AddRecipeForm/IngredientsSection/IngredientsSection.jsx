import Select from "../Select/Select";
import Input from "../../../common/Input/Input";
import { useIngredientManager } from "../useIngredientManager";
import { ErrorMessage, useFormikContext } from "formik";
import Icon from "../../../shared/Icon";
import css from "./ingredientsSection.module.css";
import Button from "../../../common/Button/Button";

export default function IngredientsSection({ setFieldValue }) {
  const { values } = useFormikContext();
  const {
    ingredients,
    // ingredientInput,
    ingredientList,
    handleSelectChange,
    handleInputChange,
    handleAddIngredient,
    handleDelete,
  } = useIngredientManager(values, setFieldValue);

  return (
    <>
      <h2>Ingredients</h2>
      <Select
        name="ingredient"
        labelText="Name"
        options={ingredientList}
        // value={ingredientInput.ingredient?._id || ""}
        onChange={handleSelectChange}
        placeholder="Broccoli"
      />

      <ErrorMessage name="ingredientInput.ingredient._id">
        {(msg) => <div className={css.error}>{msg}</div>}
      </ErrorMessage>
      <Input
        name="measure"
        labelText="Amount"
        // value={ingredientInput.measure}
        onChange={handleInputChange}
        placeholder="100g"
      />
      <ErrorMessage name="ingredientInput.measure">
        {(msg) => <div className={css.error}>{msg}</div>}
      </ErrorMessage>

      <Button
        type="button"
        styleType="brown"
        name="Add Ingredient"
        paddingsY="4"
        aria-label="Add Ingredient button"
        onClick={handleAddIngredient}
      />

      <div className={css.ingredientsGrid}>
        <div className={css.ingredientsGridRow}>
          <div
            className={`${css.ingredientsGridCell} ${css.ingredientsGridHead}`}
          >
            Name:
          </div>
          <div
            className={`${css.ingredientsGridCell} ${css.ingredientsGridHead}`}
          >
            Amount:
          </div>
          <div
            className={`${css.ingredientsGridCell} ${css.ingredientsGridHead}`}
          ></div>
        </div>

        {ingredients.map((ing) => (
          <div key={ing.id} className={css.ingredientsGridRow}>
            <div className={css.ingredientsGridCell}>{ing.name}</div>
            <div className={css.ingredientsGridCell}>{ing.measure}</div>
            <div className={css.ingredientsGridCell}>
              <button
                className={css.deleteBtn}
                type="button"
                onClick={() => handleDelete(ing.id)}
              >
                <Icon name="delete" classname={css.deleteBtnIcon} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
