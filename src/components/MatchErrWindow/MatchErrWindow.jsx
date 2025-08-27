
import Button from "../../common/Button/Button";
import css from "./MatchErrWindow.module.css";
const MatchErrWindow = ({ onReset }) => {
  return (
    <div className={css.div_err}>
      <h2>We're sorry! We were not able to find a match</h2>
      <Button
        type="button"
        styleType="transparent"
        name="Reset"
        paddingsY="16"
        aria-label="Reset serach and filters"
        onClick={onReset}
      />
    </div>
  );
};

export default MatchErrWindow;
