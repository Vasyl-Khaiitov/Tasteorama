import { useId } from "react";
import css from "./Select.module.css";
import { Field, useField } from "formik";

export default function Select({
  name,
  placeholder,
  labelText,
  options = [],
  onChange,
}) {
  const fieldId = useId();

  const [field, meta] = useField(name);

  const isEmpty = !field.value || field.value === "";

  const baseClass = meta.touched && meta.error ? css.inputError : css.inputName;
  const inputClassName = `${baseClass} ${isEmpty ? css.empty : ""}`;

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={css.selectWrapper}>
      <label className={css.labelName} htmlFor={fieldId}>
        {labelText}
        <div className={css.inputWrapper}>
          <Field
            {...field}
            id={fieldId}
            as="select"
            name={name}
            className={inputClassName}
            onChange={handleChange}
            value={field.value || ""}
          >
            {/* Плейсхолдер */}
            <option value="" disabled>
              {placeholder}
            </option>

            {/* Варіанти списку */}
            {options.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </Field>
        </div>
      </label>
      {/* Помилка */}
      <span className={css.error}>
        {meta.touched && meta.error ? meta.error : "\u00A0"}
      </span>
    </div>
  );
}
