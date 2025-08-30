import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchIngredients } from "../../redux/ingredients/operations";

export const useIngredientManager = (setFieldValue) => {
  const dispatch = useDispatch();

  const ingredientList = useSelector(selectIngredients);

  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState({
    ingredient: { _id: "", name: "" },
    measure: "",
  });

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = ingredientList.find((item) => item._id === selectedId);
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

  const handleAddIngredient = () => {
    const updatedIngredients = [
      ...ingredients,
      {
        id: ingredientInput.ingredient._id,
        name: ingredientInput.ingredient.name,
        measure: ingredientInput.measure,
      },
    ];

    setIngredients(updatedIngredients);
    setFieldValue("ingredients", updatedIngredients); // 🔥 Formik
  };

  const handleDelete = (id) => {
    const updatedIngredients = ingredients.filter((item) => item.id !== id);
    setIngredients(updatedIngredients);
    setFieldValue("ingredients", updatedIngredients); // 🔥 Formik
  };

  return {
    ingredients,
    ingredientInput,
    ingredientList,
    handleSelectChange,
    handleInputChange,
    handleAddIngredient,
    handleDelete,
  };
};
