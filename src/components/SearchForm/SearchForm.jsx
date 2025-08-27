import css from "./SearchForm.module.css";
import Button from "../../common/Button/Button";

export default function SearchForm({ value, onChange, onSubmit }) {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.wraper}>
        <input
          type="text"
          name="search"
          placeholder="Search recipes"
          className={css.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
  );
}
