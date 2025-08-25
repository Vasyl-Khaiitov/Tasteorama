import style from "./RecipeCard.module.css";
import Icon from "../../shared/Icon";
import { NavLink } from "react-router-dom";

export function RecipeCard({
  dishPhoto,
  recipeName,
  recipeDescription,
  recipeTime,
  recipeId,
}) {
  return (
    <div className={style.card}>
      <img className={style.img} src={dishPhoto} alt={recipeName} />

      <div className={style.header}>
        <h3 className={style.title}> {recipeName} </h3>
        <div className={style.containerTime}>
          <p className={style.time}>
            {" "}
            <Icon name="clock" classname={style.icon} /> {recipeTime}{" "}
          </p>
        </div>
      </div>

      <div className={style.descrContainer}>
        <p className={style.description}> {recipeDescription} </p>
        <p className={style.cals}> - cals </p>
      </div>

      <div className={style.btnContainer}>
        <NavLink to={`/recipes/${recipeId}`} className={style.btn}>
          {" "}
          Learn more{" "}
        </NavLink>
        <button className={style.btnIcon}>
          {" "}
          <Icon name="flag" classname={style.icon} />{" "}
        </button>
      </div>
    </div>
  );
}
