import Button from "../../common/Button/Button";
import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, disabled }) {
  return (
    <Button
      styleType="brown"
      name={disabled ? "Loading..." : "Load More"}
      disabled={disabled}
      onClick={onClick}
      paddingsY={12}
      paddingsX={24}
      className={css.loadMoreBtn}
    />
  );
}
