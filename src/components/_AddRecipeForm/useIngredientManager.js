import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchIngredients } from "../../redux/ingredients/operations";

export const useIngredientManager = (values, setFieldValue) => {
  const dispatch = useDispatch();
  const ingredientList = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = ingredientList.find((item) => item._id === selectedId);

    if (selectedItem) {
      setFieldValue("ingredientInput", {
        ...values.ingredientInput,
        ingredient: {
          _id: selectedItem._id,
          name: selectedItem.name,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFieldValue("ingredientInput", {
      ...values.ingredientInput,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    const { ingredient, measure } = values.ingredientInput;

    if (!ingredient._id || !measure) return;

    const updatedIngredients = [
      ...values.ingredients,
      {
        id: ingredient._id,
        name: ingredient.name,
        measure,
      },
    ];

    setFieldValue("ingredients", updatedIngredients);

    // Очистити тимчасовий ввід
    setFieldValue("ingredientInput", {
      ingredient: { _id: "", name: "" },
      measure: "",
    });
  };

  const handleDelete = (id) => {
    const updatedIngredients = values.ingredients.filter(
      (item) => item.id !== id
    );
    setFieldValue("ingredients", updatedIngredients);
  };

  return {
    ingredients: values.ingredients,
    ingredientInput: values.ingredientInput,
    ingredientList,
    handleSelectChange,
    handleInputChange,
    handleAddIngredient,
    handleDelete,
  };
};
