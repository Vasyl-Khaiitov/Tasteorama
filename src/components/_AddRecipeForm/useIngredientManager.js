import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchIngredients } from "../../redux/ingredients/operations";
import { useFormikContext } from "formik";
import { toast } from "react-toastify";

export const useIngredientManager = () => {
  const dispatch = useDispatch();
  const ingredientList = useSelector(selectIngredients);

  const { values, setFieldValue, setFieldTouched, validateField } =
    useFormikContext();

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
    setFieldValue(name, value);
  };

  const handleAddIngredient = async () => {
    const { ingredient, measure } = values.ingredientInput;

    const isDuplicate = values.ingredients.some(
      (item) => item.id === ingredient._id
    );

    if (isDuplicate) {
      toast.warning(`"${ingredient.name}" is already in the list.`);
      return;
    }

    if (!ingredient._id || !measure) {
      return;
    }

    const updatedIngredients = [
      ...values.ingredients,
      {
        id: ingredient._id,
        name: ingredient.name,
        measure,
      },
    ];

    setFieldValue("ingredients", updatedIngredients);
    setFieldTouched("ingredients", true);
    await validateField("ingredients");

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
    setFieldTouched("ingredients", true);
    validateField("ingredients");
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
