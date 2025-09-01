import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostRecipes } from "../../redux/addRecipes/operations";
import {
  selectIsLoading,
  selectCreatedRecipe,
  selectError,
} from "../../redux/addRecipes/selectors";
import { recipeValidationSchema, initialValues } from "./validationSchema";
import GeneralInfoSection from "./GeneralInfoSection/GeneralInfoSection";
import IngredientsSection from "./IngredientsSection/IngredientsSection";
import InstructionsSection from "./InstructionsSection/InstructionsSection";
import ImageUploadSection from "./ImageUploadSection/ImageUploadSection";
import Loader from "../Loader/Loader";
import Button from "../../common/Button/Button";
import css from "./_AddRecipeForm.module.css";
import { useCategoryManager } from "./useCategoryManager";
import { toast } from "react-toastify";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetCreatedRecipe } from "../../redux/addRecipes/slice";

export default function AddRecipeForm() {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const createdRecipe = useSelector(selectCreatedRecipe);
  const { categories } = useCategoryManager();
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const isSubmittedRef = useRef(false);

  const handleSubmit = (values) => {
    if (isSubmittedRef.current) return;
    isSubmittedRef.current = true;

    const formData = new FormData();

    const cleanedIngredients = values.ingredients.map(({ id, measure }) => ({
      id,
      measure,
    }));

    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("calories", String(values.calories || ""));
    formData.append("instructions", values.instructions);
    formData.append("description", values.description);
    formData.append("time", String(values.time));
    formData.append("ingredients", JSON.stringify(cleanedIngredients));

    if (values.thumb) {
      formData.append("thumb", values.thumb);
    }

    dispatch(fetchPostRecipes({ formData }));
  };

  useEffect(() => {
    if (createdRecipe && !error) {
      toast.success("Recipe successfully added!");
      navigate("/profile/owner", { replace: true });
      dispatch(resetCreatedRecipe());
    } else if (error) {
      toast.error(`Failed to add recipe: ${error}`);
      dispatch(resetCreatedRecipe());
    }
  }, [createdRecipe, error]);

  return (
    <>
      {isLoading && <Loader />}
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ setFieldValue, values }) => {
          const isLargeScreen = window.innerWidth >= 1440; // можна ще хук useMediaQuery
          const isImageUploaded = Boolean(values.thumb);

          return (
            <Form>
              <div className={css.formInnerContainer}>
                <div className={css.col2}>
                  <h2 className={css.subTitle}>Upload Photo</h2>
                  <ImageUploadSection setFieldValue={setFieldValue} />
                  {isLargeScreen && isImageUploaded && (
                    <Button
                      type="submit"
                      styleType="brown"
                      name="Publish Recipe"
                      paddingsY="12"
                      aria-label="Publish Recipe"
                    />
                  )}
                </div>
                <div className={css.col1}>
                  <h2 className={css.subTitle}>General information</h2>
                  <GeneralInfoSection categoriesList={categories} />
                  <h2 className={css.subTitle}>Ingredients</h2>
                  <IngredientsSection setFieldValue={setFieldValue} />
                  <h2 className={css.subTitle}>Instructions</h2>
                  <InstructionsSection />
                  {(!isLargeScreen || !isImageUploaded) && (
                    <Button
                      type="submit"
                      styleType="brown"
                      name="Publish Recipe"
                      paddingsY="12"
                      aria-label="Publish Recipe"
                    />
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
