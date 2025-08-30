import * as Yup from "yup";

export const initialValues = {
  title: "",
  description: "",
  time: "",
  calories: "",
  category: "",
  ingredient: "",
  measure: "",
  ingredients: [],
  instructions: "",
  thumb: null,
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export const recipeValidationSchema = Yup.object({
  title: Yup.string()
    .max(64, "Title must be at most 64 characters")
    .required("Title is required"),

  description: Yup.string()
    .max(200, "Description must be at most 200 characters")
    .required("Description is required"),

  time: Yup.number()
    .min(1, "Cooking time must be at least 1 minute")
    .max(360, "Cooking time must be at most 360 minutes")
    .required("Cooking time is required"),

  calories: Yup.number()
    .min(1, "Calories must be at least 1")
    .max(10000, "Calories must be at most 10000")
    .nullable()
    .required("Calories required"),

  category: Yup.string().required("Category is required"),

  // ingredient: Yup.string().required("Ingredient is required"),

  // measure: Yup.string().required("Amount is required"),

  // ingredients: Yup.array()
  //   .min(2, "You must add at least 2 ingredients")
  //   .max(16, "You can add up to 16 ingredients")
  //   .of(
  //     Yup.object({
  //       id: Yup.string().required("Ingredient ID is required"),
  //       measure: Yup.string().required("Measure is required"),
  //     })
  //   ),

  // instructions: Yup.string()
  //   .max(1200, "Instructions must be at most 1200 characters")
  //   .required("Instructions are required"),

  thumb: Yup.mixed()
    .test(
      "fileSize",
      "Image must be less than 2MB",
      (value) => !value || value.size <= MAX_IMAGE_SIZE
    )
    .nullable(),
});
