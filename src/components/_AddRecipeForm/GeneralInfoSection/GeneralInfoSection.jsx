import Input from "../../../common/Input/Input";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";
import css from "./GeneralInfoSection.module.css";
export default function GeneralInfoSection({ categoriesList }) {
  return (
    <div className={css.generalSection}>
      <div className={css.inputContainer}>
        <Input
          name="title"
          labelText="Recipe Title"
          placeholder="Enter the name of your recipe"
          className={css.inputBiggerPadding}
          labelClassName="labelNameRForm" //  перебиває на font-size: 18px
        />
      </div>
      <TextArea
        name="description"
        labelText="Recipe Description"
        placeholder="Enter a brief description of your recipe"
      />
      <div className={css.inputContainer}>
        <Input
          name="time"
          labelText="Cooking time in minutes"
          placeholder="Time in minutes"
          className={css.inputBiggerPadding}
          labelClassName="labelNameRForm"
        />
      </div>
      <div className={css.wrapper}>
        <Input
          name="calories"
          labelText="Calories"
          placeholder="Calories"
          className={css.inputTwoColl}
          labelClassName="labelNameRForm"
        />
        <Select
          name="category"
          labelText="Category"
          options={categoriesList}
          className={css.inputTwoColl}
          labelClassName="labelNameRForm"
        />
      </div>
    </div>
  );
}
