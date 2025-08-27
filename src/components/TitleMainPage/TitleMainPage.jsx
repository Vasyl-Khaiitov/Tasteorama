import { useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filter/selectors";
import css from "./TitleMainPage.module.css";

export default function TitleMainPage() {
  const search = useSelector(selectNameFilter);
  return (
    <h2 className={css.title}>
      {search.trim() === "" ? "Recepies" : `Search Results for "${search}"`}
    </h2>
  );
}
