import css from "../../components/MatchErrWindow/MatchErrWindow.module.css";
const MatchErrWindow = ({ message }) => {
     return (
	<div className={css.div_err}>
	     <h2>{message || "We're sorry! We were not able to find a match"}</h2>
	</div>
     );
};

export default MatchErrWindow;
