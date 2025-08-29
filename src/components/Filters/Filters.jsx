import { useState, useEffect } from "react";
import style from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/operations";
import { fetchIngredients } from "../../redux/ingredients/operations";
import { resetFilters, setCategory, setIngredient } from "../../redux/filter/slice";
import { fetchRecipes } from "../../redux/recipes/operations";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../redux/categories/selectors";
import {
  selectIngredients,
  selectIngredientsLoading,
} from "../../redux/ingredients/selectors";
import {
  selectCategoryFilter,
  selectIngredientFilter,
} from "../../redux/filter/selectors";

import FilterModal from "../FilterModal/FilterModal";  
import Icon from "../../shared/Icon";

import { SelectTotalRecepies } from "../../redux/recipes/selectors";
import { selectNameFilter } from "../../redux/filter/selectors";

export default function Filters() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const loadingCategories = useSelector(selectCategoriesLoading);
  const loadingIngredients = useSelector(selectIngredientsLoading);

  const selectedCategory = useSelector(selectCategoryFilter);
  const selectedIngredient = useSelector(selectIngredientFilter);
  const searchText = useSelector(selectNameFilter);
  const totalRecepies = useSelector(SelectTotalRecepies);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleFilterChange = (type, value) => {
    if (type === "category") dispatch(setCategory(value));
    if (type === "ingredient") dispatch(setIngredient(value));

    dispatch(
      fetchRecipes({
        page: 1,
        perPage: 12,
        title: searchText || undefined,
        category: (type === "category" ? value : selectedCategory) || undefined,
        ingredient: (type === "ingredient" ? value : selectedIngredient) || undefined,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(fetchRecipes({ page: 1, perPage: 12 }));
  };

  return (
    <>
      {}
    <div>{totalRecepies} recipes</div>
      <button className={style.resetBtn} onClick={handleReset}>
        Reset filters
      </button>
      <div className={style.selectContainer}>
        {/* Category */}
        <div className={style.selectGroup}>
          <select
            className={style.select}
            value={selectedCategory}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Category
            </option>
            {loadingCategories ? (
              <option>Loading...</option>
            ) : (
              categories.map((cat) => (
                <option className={style.option} key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Ingredient */}
        <div className={style.selectGroup}>
          <select
            className={style.select}
            value={selectedIngredient}
            onChange={(e) => handleFilterChange("ingredient", e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Ingredient
            </option>
            {loadingIngredients ? (
              <option>Loading...</option>
            ) : (
              ingredients.map((ing) => (
                <option className={style.option} key={ing._id} value={ing._id}>
                  {ing.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Filter button */}
      <button className={style.filterBtn} onClick={() => setIsModalOpen(true) }>
        Filters <Icon
            name="filter"
            classname={style.icon}
          />
      </button>

      {/* Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        ingredients={ingredients}
        selectedCategory={selectedCategory}
        selectedIngredient={selectedIngredient}
        handleFilterChange={handleFilterChange}
        handleReset={handleReset}
      />
    </>
  );
};