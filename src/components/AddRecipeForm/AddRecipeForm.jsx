import { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import TextArea from "../../common/TextArea/TextArea";
import Select from "../../common/Select/Select";
import css from "./AddRecipeForm.module.css";
import cssPage from "../../pages/AddRecipePage/AddRecipePage.module.css";
import * as Yup from "yup";
import Loader from "../../components/Loader/Loader.jsx";
import apiClient from "../../api/api.js";

const AddRecipeForm = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [preview, setPreview] = useState(null); //? навіщо

  // const [ingredientError, setIngredientError] = useState("");
  // const [measureError, setMeasureError] = useState("");

  const initialValues = {
    title: "",
    description: "",
    time: "",
    calories: "",
    category: "",
    ingredient: "",
    measure: "",
    ingredients: [{ id: "", measure: "" }],
    instructions: "",
    thumb: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    //time: Yup.string().required("Cooking time is required").positive(),
    //calories: Yup.number().nullable().positive(),
    time: Yup.string().required("Required"), //Перевірити тип
    calories: Yup.string(), //Перевірити тип
    category: Yup.string().required("Required"),
    //!!!!! перевірка для одного інгредієнта та масив
    ingredients: Yup.array().of(
      Yup.object({
        id: Yup.string().required("Required"),
        measure: Yup.string().required("Required"),
      })
    ),
    instructions: Yup.string().required("Required"),
    // ingredient: Yup.string().required("Required"),
    // measure: Yup.string().required("Required"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([
          apiClient.get("categories"),
          apiClient.get("ingredients"),
        ]);

        setCategoriesList(categoriesRes.data.data);
        setIngredientsList(ingredientsRes.data.data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "ingredients") {
        formData.append(key, JSON.stringify(value));
      } else if (key === "photo" && value) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await fetch("http://localhost:3030/api/recipes", {
        method: "POST",
        headers: {
          Authorization: "Bearer yourTokenHere",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save recipe");
      const data = await res.json();
      alert("✅ Recipe successfully added!");
      window.location.href = `/recipes/${data.data._id}`;
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  //   const [imagePreview, setImagePreview] = useState(null);
  // /
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setImagePreview(URL.createObjectURL(file)); // тимчасове preview
  //   }
  // };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState({
    ingredient: "",
    measure: "",
  });

  // const [errors, setErrors] = useState({ ingredient: "", measure: "" });

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = ingredientsList.find(
      (item) => item._id === selectedId
    );
    if (selectedItem) {
      setIngredientInput((prev) => ({
        ...prev,
        ingredient: {
          _id: selectedItem._id,
          name: selectedItem.name,
        },
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIngredientInput((prev) => ({ ...prev, [name]: value }));
  };

  //const { setFieldTouched, setFieldError, values } = useFormikContext();

  const handleAddIngredient = () => {
    if (!ingredientInput.ingredient._id || !ingredientInput.measure) {
      alert("Required");
      return;
    }

    setIngredients((prev) => [
      ...prev,
      {
        id: ingredientInput.ingredient._id,
        name: ingredientInput.ingredient.name,
        measure: ingredientInput.measure,
      },
    ]);

    setIngredientInput({ ingredient: { _id: "", name: "" }, measure: "" });
  };

  const handleDelete = (id) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const [imagePreview, setImagePreview] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleUpload = () => {
  //   if (!selectedFile) {
  //     alert("No file selected!");
  //     return;
  //   }

  //   alert(`File ready to upload: ${selectedFile.name}`);
  // };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* {({ values, setFieldTouched, setFieldError }) => ( */}
        <Form className="form">
          <div className={css.formInnerContainer}>
            <div className={css.col1}>
              <p className={cssPage.subTitle}>General information</p>
              <div className={css.inputContainer}>
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter the name of your recipe"
                  labelText="Recipe Title"
                  className="inputNameRForm"
                  labelClassName="labelNameRForm"
                  errorClaseName="inputErrorRForm"
                />
              </div>
              <div className={css.inputContainer}>
                <TextArea
                  name="description"
                  placeholder="Enter a brief description of your recipe"
                  labelText="Recipe Description"
                />
              </div>

              <div className={css.inputContainer}>
                <Input
                  name="time"
                  type="text"
                  placeholder="Enter Time in minutes"
                  labelText="Cooking Time in minutes"
                  className="inputNameRForm"
                  labelClassName="labelNameRForm"
                  errorClaseName="inputErrorRForm"
                />
              </div>

              <div className={css.caloriesCategoryContainer}>
                <div>
                  <div className={css.inputContainer}>
                    <Input
                      name="calories"
                      type="text"
                      placeholder="Enter Calories"
                      labelText="Calories"
                      className="inputNameRForm"
                      labelClassName="labelNameRForm"
                      errorClaseName="inputErrorRForm"
                    />
                  </div>
                </div>
                <div>
                  <div className={css.inputContainer}>
                    <Select
                      name="category"
                      labelText="Category"
                      options={categoriesList}
                      placeholder="Category"
                      labelClassName="labelNameRForm"
                    />
                  </div>
                </div>
              </div>

              <p className={`${cssPage.subTitle} ${cssPage.subTitleAdd}`}>
                Ingredients
              </p>

              <div className={css.ingredientsContainer}>
                <div className={css.col1}>
                  <div className={css.inputContainer}>
                    <Select
                      name="ingredient"
                      labelText="Name"
                      options={ingredientsList}
                      value={ingredientInput.ingredient?._id || ""}
                      onChange={handleSelectChange}
                      placeholder="Ingredient"
                    />
                    {/* {ingredientError && (
                        <p className={css.errorText}>{ingredientError}</p>
                      )} */}
                  </div>
                </div>
                <div className={css.col2}>
                  <div className={css.inputContainer}>
                    <Input
                      name="measure"
                      type="text"
                      placeholder="Enter Amount"
                      labelText="Amount"
                      value={ingredientInput.measure}
                      onChange={handleInputChange}
                      className="inputNameRForm"
                      labelClassName="labelNameRForm"
                      errorClaseName="inputErrorRForm"
                    />
                  </div>
                </div>
                <div className={css.col1}></div>
                <div className={css.col2}>
                  <button
                    type="button"
                    onClick={() => {
                      // setFieldTouched("ingredient", true);
                      // setFieldTouched("measure", true);

                      // if (!values.ingredient || !values.measure) {
                      //   setFieldError("ingredient", "Required");
                      //   setFieldError("measure", "Required");
                      //   return;
                      // }

                      // if (!ingredientInput.ingredient?._id) {
                      //   setIngredientError("Required");
                      // } else {
                      //   setIngredientError("");
                      // }

                      // if (!ingredientInput.measure) {
                      //   setMeasureError("Required");
                      // } else {
                      //   setMeasureError("");
                      // }

                      // if (
                      //   !ingredientInput.ingredient?._id ||
                      //   !ingredientInput.measure
                      // )
                      //   return;

                      handleAddIngredient();
                    }}
                  >
                    Add Ingredient
                  </button>
                </div>
              </div>

              <div className={css.ingredientsGrid}>
                <div className={css.ingredientsGridRow}>
                  <div
                    className={`${css.ingredientsGridCell} ${css.ingredientsGridHead}`}
                  >
                    Name:
                  </div>
                  <div
                    className={`${css.ingredientsGridCell} ${css.ingredientsGridHead}`}
                  >
                    Amount:
                  </div>
                  <div
                    className={`${css.ingredientsGridCell} ${css.ingredientsGridHead}`}
                  ></div>
                </div>
                {ingredients.map((ing) => (
                  <div className={css.ingredientsGridRow} key={ing.id}>
                    <div className={css.ingredientsGridCell}>{ing.name}</div>
                    <div className={css.ingredientsGridCell}>{ing.measure}</div>
                    <div className={css.ingredientsGridCell}>
                      <button
                        className={css.ingredientsGridRowDel}
                        type="button"
                        onClick={() => handleDelete(ing.id)}
                      ></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* <ul>
                <li>Name: Amount:</li>
                {ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.id} - {ing.name} - {ing.measure}
                    <button type="button" onClick={() => handleDelete(ing.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul> */}

              <p className={cssPage.subTitle}>Instructions</p>

              <div className={css.inputContainer}>
                <TextArea
                  name="instructions"
                  placeholder="Enter a text"
                  rows="5"
                />
              </div>

              <button type="submit" className="btn-submit">
                Publish Recipe
              </button>
            </div>
            <div className={css.col2}>
              <div>
                <p className={cssPage.subTitlePhoto}>Upload Photo</p>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="fileInput"
                  className={`${css.uploadBox} ${
                    isDragging ? css.dragging : ""
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={css.previewImg}
                    />
                  ) : (
                    <span>Click or Drag & Drop Image</span>
                  )}
                </label>
              </div>

              {/* <p className={cssPage.subTitle}>Upload Photo</p>

              <input
                type="file"
                accept="image/*"
                id="fileInput"
                // style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Select Image
              </button>

              {imagePreview && (
                <div className={css.preview}>
                  <h4>Preview:</h4>
                  <img src={imagePreview} alt="Preview" width={200} />
                </div>
              )} */}
            </div>
          </div>
        </Form>
        {/* )} */}
      </Formik>
    </>
  );
};

export default AddRecipeForm;

// import { useEffect, useState } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import Input from "../../common/Input/Input";
// import Button from "../../common/Button/Button";
// import TextArea from "../../common/TextArea/TextArea";
// import Select from "../../common/Select/Select";
// import css from "./AddRecipeForm.module.css";
// import * as Yup from "yup";

// const AddRecipeForm = () => {
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [ingredientsList, setIngredientsList] = useState([]);
//   const [preview, setPreview] = useState(null);

//   const initialValues = {
//     title: "",
//     description: "",
//     time: "",
//     calories: "",
//     category: "",
//     ingredients: [{ id: "", amount: "" }],
//     instructions: "",
//     thumb: null,
//   };

//   const validationSchema = Yup.object({
//     title: Yup.string().required("Required"),
//     description: Yup.string().required("Required"),
//     time: Yup.number()
//       .typeError("Must be a number")
//       .positive("Must be positive")
//       .required("Required"),
//     calories: Yup.number()
//       .typeError("Must be a number")
//       .positive("Must be positive")
//       .nullable(),
//     category: Yup.string().required("Required"),
//     ingredients: Yup.array().of(
//       Yup.object({
//         id: Yup.string().required("Required"),
//         amount: Yup.string().required("Required"),
//       })
//     ),
//     instructions: Yup.string().required("Required"),
//   });

//   useEffect(() => {
//     const fetchCategoriesList = async () => {
//       try {
//         const res = await fetch("http://localhost:3030/api/categories");
//         const data = await res.json();
//         setCategoriesList(data.data);
//       } catch (error) {
//         console.error("Помилка при отриманні категорій:", error);
//       }
//     };

//     const fetchIngredientsList = async () => {
//       try {
//         const res = await fetch("http://localhost:3030/api/ingredients");
//         const data = await res.json();
//         setIngredientsList(data.data);
//       } catch (error) {
//         console.error("Помилка при отриманні інгредієнтів:", error);
//       }
//     };

//     fetchCategoriesList();
//     fetchIngredientsList();
//   }, []);

//   const handleSubmit = async (values) => {
//     const formData = new FormData();
//     Object.entries(values).forEach(([key, value]) => {
//       if (key === "ingredients") {
//         formData.append(key, JSON.stringify(value));
//       } else if (key === "thumb" && value) {
//         formData.append(key, value);
//       } else {
//         formData.append(key, value);
//       }
//     });

//     try {
//       const res = await fetch("http://localhost:3030/api/recipes", {
//         method: "POST",
//         headers: {
//           Authorization: "Bearer yourTokenHere",
//         },
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to save recipe");
//       const data = await res.json();
//       alert("✅ Recipe successfully added!");
//       window.location.href = `/recipes/${data.data._id}`;
//     } catch (err) {
//       alert("❌ " + err.message);
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ values, setFieldValue }) => (
//         <Form className={css.form}>
//           <h1 className={css.title}>Add Recipe</h1>
//           <p className={css.description}>
//             Enter general information about your recipe
//           </p>

//           <Input
//             name="title"
//             type="text"
//             placeholder="Enter the name of your recipe"
//             labelText="Recipe Title"
//           />

//           <TextArea
//             name="description"
//             placeholder="Enter a brief description of your recipe"
//             labelText="Recipe Description"
//             rows="3"
//           />

//           <Input
//             name="time"
//             type="number"
//             placeholder="Enter Time in minutes"
//             labelText="Cooking Time in minutes"
//           />

//           <Input
//             name="calories"
//             type="number"
//             placeholder="Enter Calories"
//             labelText="Calories"
//           />

//           <Select
//             name="category"
//             labelText="Categories"
//             options={categoriesList}
//           />

//           <div>
//             <h3>Ingredients</h3>
//             <FieldArray name="ingredients">
//               {({ push, remove }) => (
//                 <div>
//                   {values.ingredients.map((ing, index) => (
//                     <div key={index} className={css.ingredientRow}>
//                       <Field
//                         as="select"
//                         name={`ingredients.${index}.id`}
//                         className={css.input}
//                       >
//                         <option value="">-- Select ingredient --</option>
//                         {ingredientsList.map((item) => (
//                           <option key={item._id} value={item._id}>
//                             {item.name}
//                           </option>
//                         ))}
//                       </Field>
//                       <Field
//                         name={`ingredients.${index}.amount`}
//                         placeholder="Amount"
//                         className={css.input}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className={css.btnRemove}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => push({ id: "", amount: "" })}
//                     className={css.btnAdd}
//                   >
//                     Add Ingredient
//                   </button>
//                 </div>
//               )}
//             </FieldArray>
//           </div>

//           <TextArea
//             name="instructions"
//             placeholder="Enter instructions"
//             labelText="Instructions"
//             rows="4"
//           />

//           <div className={css.uploadBlock}>
//             <label>Upload Photo</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 setFieldValue("thumb", e.target.files[0]);
//                 setPreview(URL.createObjectURL(e.target.files[0]));
//               }}
//             />
//             {preview && (
//               <img src={preview} alt="preview" className={css.preview} />
//             )}
//           </div>

//           <button type="submit" className={css.btnSubmit}>
//             Publish Recipe
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default AddRecipeForm;

{
  /* <div>
            <h3 className="font-semibold">Ingredients</h3>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  {values.ingredients.map((ing, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Field
                        name={`ingredients.${index}.name`}
                        //placeholder="Ingredient name"
                        as="select"
                        className="input"
                        //className="border p-2 rounded w-1/2"
                      >
                        <option value="">-- Оберіть інгредієнт --</option>
                        {Array.isArray(ingredientsList) &&
                          ingredientsList.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </Field>
                      <Field
                        name={`ingredients.${index}.amount`}
                        placeholder="Amount"
                        //className="border p-2 rounded w-1/2"
                        className="input"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn-submit"
                      >
                        Remove ingredient
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", amount: "" })}
                    className="btn"
                  >
                    Add Ingredient
                  </button>
                </div>
              )}
            </FieldArray>
          </div> */
}
