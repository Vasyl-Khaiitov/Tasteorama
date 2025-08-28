import css from "../MatchErrWindow/MatchErrWindow.module.css";

const EmptyRecipesWindow = () => {
  return (
    <div className={css.div_err}>
      <h2>You haven't added any recipes yet.</h2>
    </div>
  );
};

export default EmptyRecipesWindow;