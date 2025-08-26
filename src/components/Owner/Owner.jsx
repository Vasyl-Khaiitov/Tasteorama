import style from "./Owner.module.css";
import OwnerList from "./OwnerList/OwnerList.jsx";
// import { useSelector } from "react-redux";
// import { selectOwnRecipesLoading } from "../../../redux/ownRecipes/selectors";

export default function Owner() {

  return (
    <section className={style}>
      <h2>Hellow Owner</h2>
      <OwnerList />
    </section>
  );
}
