// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selectIsLoggedIn, selectUser } from "../../../redux/auth/selectors";
import { selectCurrentRecipe } from "../../../redux/recipes/selectors";
import styles from "./RecipeDetails.module.css";
import NotFound from "../../NotFound/NotFound";
import clsx from "clsx";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import IngredientsList from "../IngredientsList/IngredientsList";
import Steps from "../Steps/Steps";
import { useSelector } from "react-redux";
import Icon from "../../../shared/Icon";
import About from "../About/About";
import Button from "../../../common/Button/Button";

export default function RecipeDetails() {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  //   const user = useSelector(selectUser);
  const recipe = useSelector(selectCurrentRecipe);
  console.log(recipe);
  if (!recipe) return <NotFound />;
  return (
    <>
      <div className={styles.wrapperImgh}>
        <div className={styles.containerImg}>
          <img
            src={recipe.thumb || recipe.imageUrl}
            alt={recipe.title}
            loading="lazy"
          />
        </div>
        <h1 className={styles.title}>{recipe.title}</h1>
      </div>
      <div className={styles.recipeLayout}>
        <div className={styles.generalInfobutton}>
          <GeneralInfo
            category={recipe.category ?? "N/N"}
            time={recipe.time}
            calories={recipe.cals ?? "N/N"}
          />
          <button type="button" className={styles.saveButton}>
            Save
            <Icon
              name="bookmarkicon"
              classname={clsx(styles.icon, styles.iconSaveFavorite)}
            />
          </button>
        </div>
        <div className={styles.leftContent}>
          <About description={recipe.description} />
          <IngredientsList ingredients={recipe.ingredients} />
          <Steps instructions={recipe.instructions} />
        </div>
      </div>
    </>
  );
}
