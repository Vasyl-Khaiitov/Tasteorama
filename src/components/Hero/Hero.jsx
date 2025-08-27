import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import css from "./Hero.module.css";
import SearchForm from "../SearchForm/SearchForm.jsx";

import { fetchRecipes } from "../../redux/recipes/operations.js";
import { resetRecipes } from "../../redux/recipes/slice.js";
import { selectNameFilter } from "../../redux/filter/selectors.js";
import { changeRecipeSearch } from "../../redux/filter/slice";

export default function Hero() {
  const dispatch = useDispatch();
  const textSearch = useSelector(selectNameFilter);

  const [search, setSearch] = useState(textSearch);

  useEffect(() => {
    setSearch(textSearch);
  }, [textSearch]);

  // debounce тепер тут, у Hero
  const debouncedSearch = useDebouncedCallback((value) => {
    dispatch(changeRecipeSearch(value));
    dispatch(resetRecipes());
    dispatch(fetchRecipes({ page: 1, perPage: 12, title: value }));
  }, 500);

  const handleChange = (value) => {
    const trimmed = value.trimStart();
    if (/^\d{3,}$/.test(trimmed)) {
      toast.warn("The search field is for text only!");
      return;
    }
    setSearch(trimmed);
    debouncedSearch(trimmed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = search.trim();

    if (!trimmed) {
      toast.error("Please enter a recipe title to search!");
      return;
    }
    if (/^\d{3,}$/.test(trimmed)) {
      toast.warn("The search field is for text only!");
      return;
    }
    // викликає пошук миттєво при сабміті
    debouncedSearch.flush();
    dispatch(changeRecipeSearch(trimmed));
    dispatch(resetRecipes());
    dispatch(fetchRecipes({ page: 1, perPage: 12, title: trimmed }));
  };

  return (
    <section className={css.hero}>
      <div className={css.container}>
        <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>
        <SearchForm
          value={search}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
