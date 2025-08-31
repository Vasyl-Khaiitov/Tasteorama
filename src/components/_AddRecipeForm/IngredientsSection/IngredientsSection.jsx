import Select from "../Select/Select";
// import Input from "../../../common/Input/Input";
import clsx from "clsx";
import * as Yup from "yup";

import { useIngredientManager } from "../useIngredientManager";
import { ErrorMessage, useFormikContext } from "formik";
import Icon from "../../../shared/Icon";
import css from "./ingredientsSection.module.css";
import AddIngredientButton from "../AddIngredientButton/AddIngredientButton";

export default function IngredientsSection() {
  const { errors, touched } = useFormikContext();

  const hasError =
    touched.ingredientInput?.measure && errors.ingredientInput?.measure;

  const {
    ingredients,
    ingredientInput,
    ingredientList,
    handleSelectChange,
    handleInputChange,
    handleAddIngredient,
    handleDelete,
  } = useIngredientManager();

  return (
    <div className={css.ingredientSection}>
      <div className={css.ingredientsRow}>
        <div className={css.inputGroup}>
          <Select
            name="ingredientInput.ingredient._id"
            labelText="Name"
            options={ingredientList}
            value={ingredientInput.ingredient?._id || ""}
            onChange={handleSelectChange}
            placeholder="Ingredient"
          />
          <ErrorMessage name="ingredientInput.ingredient._id">
            {(msg) => <div className={css.error}>{msg}</div>}
          </ErrorMessage>
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="measure" className={css.lableName}>
            Amount
          </label>
          <input
            id="measure"
            name="ingredientInput.measure"
            value={ingredientInput.measure}
            placeholder="100g"
            onChange={handleInputChange}
            className={clsx(css.inputName, {
              [css.inputError]: hasError,
            })}
          />
          <ErrorMessage name="ingredientInput.measure">
            {(msg) => <div className={css.error}>{msg}</div>}
          </ErrorMessage>
        </div>
      </div>
      <div className={css.addBtnWrapper}>
        <AddIngredientButton
          className={css.addIngrBtn}
          onClick={handleAddIngredient}
        />
      </div>

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
        {Array.isArray(ingredients) &&
          ingredients.map((ing) => (
            <div className={css.ingredientsGridRow} key={ing.id}>
              <div className={css.ingredientsGridCell}>{ing.name}</div>
              <div className={css.ingredientsGridCell}>{ing.measure}</div>
              <div className={css.ingredientsGridCell}>
                <button
                  className={css.deleteBtn}
                  type="button"
                  onClick={() => handleDelete(ing.id)}
                >
                  <Icon name={"delete"} classname={css.deleteBtnIcon} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
