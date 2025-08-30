import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostRecipes } from "../../redux/addRecipes/operations";
import {
  selectIsLoading,
  selectCreatedRecipe,
} from "../../redux/addRecipes/selectors";
import { recipeValidationSchema, initialValues } from "./validationSchema";
import GeneralInfoSection from "./GeneralInfoSection/GeneralInfoSection";
import IngredientsSection from "./IngredientsSection/IngredientsSection";
import InstructionsSection from "./InstructionsSection/InstructionsSection";
import ImageUploadSection from "./ImageUploadSection/ImageUploadSection";
import Loader from "../Loader/Loader";
import Button from "../../common/Button/Button";
import { useCategoryManager } from "./useCategoryManager";

export default function AddRecipeForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const createdRecipe = useSelector(selectCreatedRecipe);
  const { categories } = useCategoryManager();

  const handleSubmit = (values) => {
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

  return (
    <>
      {isLoading && <Loader />}
      {createdRecipe && <p className="success">Recipe added!</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <ImageUploadSection setFieldValue={setFieldValue} />
            <GeneralInfoSection categoriesList={categories} />
            <IngredientsSection setFieldValue={setFieldValue} />
            <InstructionsSection />
            <Button
              type="submit"
              styleType="brown"
              name="Publish Recipe"
              paddingsY="12"
              aria-label="Publish Recipe"
            ></Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
