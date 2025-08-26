import { useEffect, useState } from "react";
import css from "./Hero.module.css";
import Button from "../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { changeRecipeSearch } from "../../redux/filter/slice";
import { selectNameFilter } from "../../redux/filter/selectors.js";
import { fetchRecipes } from "../../redux/recipes/operations.js";
import { resetRecipes } from "../../redux/recipes/slice.js";

export default function Hero() {
  const dispatch = useDispatch();
  const textSearch = useSelector(selectNameFilter);

  const [search, setSearch] = useState(textSearch);

  useEffect(() => {
    setSearch(textSearch);
  }, [textSearch]);

  const debounced = useDebouncedCallback((value) => {
    dispatch(changeRecipeSearch(value));
    dispatch(resetRecipes()); // чистимо попередні рецепти
    dispatch(fetchRecipes({ page: 1, perPage: 12, title: value })); // новий пошук
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value); // миттєво оновлюємо поле
    debounced(value); // відправляємо значення у Redux з затримкою
  };

  return (
    <section className={css.hero}>
      <div className={css.container}>
        <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>
        <form className={css.form} onSubmit={(e) => e.preventDefault()}>
          <div className={css.wraper}>
            <input
              type="text"
              name="search"
              placeholder="Search recipes"
              className={css.input}
              value={search} // використовуємо локальний стан
              onChange={handleChange}
            />
            <Button
              type="submit"
              styleType="brown"
              name="Search"
              paddingsY="13"
              aria-label="Search button"
              className={css.searchBtn}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
