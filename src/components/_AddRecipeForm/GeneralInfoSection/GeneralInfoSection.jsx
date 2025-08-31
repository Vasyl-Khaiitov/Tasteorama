import Input from "../../../common/Input/Input";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";

export default function GeneralInfoSection({ categoriesList }) {
  return (
    <>
      <h2>General Information</h2>
      <Input name="title" labelText="Recipe Title" placeholder="Enter title" />
      <TextArea
        name="description"
        labelText="Recipe Description"
        placeholder="Enter a brief description of your recipe"
      />
      <Input
        name="time"
        labelText="Cooking Time"
        placeholder="Time in minutes"
      />
      <Input name="calories" labelText="Calories" placeholder="Calories" />
      <Select
        name="category"
        labelText="Category"
        options={categoriesList}
        placeholder="Soup"
      />
    </>
  );
}
