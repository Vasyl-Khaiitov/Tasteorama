import style from "./LoadMoreBtn.module.css";


export default function LoadMoreBtn({ onClick, disabled }) {
  return (
    <button
      className={style.loadMoreBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "Loading..." : "Load More"}
    </button>
  );
}