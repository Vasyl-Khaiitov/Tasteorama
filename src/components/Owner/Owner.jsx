import style from "./Owner.module.css";
import OwnerList from "./OwnerList/OwnerList.jsx";
import MatchErrWindow from "../MatchErrWindow/MatchErrWindow.jsx";
import { useSelector } from "react-redux";
import { selectOwnRecipes } from "../../redux/ownRecipes/selectors.js";

export default function Owner() {
  const ownRecipes = useSelector(selectOwnRecipes);
  
  return (
    <>
     {ownRecipes.length > 0 ? (
  <OwnerList />
) : (
  <div className={style.errorWrapper}>
    <MatchErrWindow message="You haven't added any recipes yet." />
  </div>
)}
    </>
  );
}
