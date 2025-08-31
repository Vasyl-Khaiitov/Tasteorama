import style from "./Owner.module.css";
import OwnerList from "./OwnerList/OwnerList.jsx";
import EmptyRecipesWindow from "../EmptyRecipesWindow/EmptyRecipesWindow.jsx";
import { useSelector } from "react-redux";
import { selectOwnRecipes } from "../../redux/ownRecipes/selectors.js";

export default function Owner() {
  const ownRecipes = useSelector(selectOwnRecipes);

  return (
    <>
      <OwnerList />
      {ownRecipes.length === 0 && (
        <div className={style.errorWrapper}>
          <EmptyRecipesWindow />
        </div>
      )}
    </>
  );
}
