import { useId } from "react";
import css from "./Select.module.css";
import { ErrorMessage, Field, useField } from "formik";

export default function Select({
  name,
  placeholder,
  labelText,
  options = [],
  onChange,
  value,
}) {
  const fieldId = useId();

  const [field, meta] = useField(name);

  const inputClassName = `${
    meta.touched && meta.error ? css.inputError : css.inputName
  }`;

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className={css.labelName} htmlFor={fieldId}>
      {labelText}
      <div className={css.inputWrapper}>
        <Field
          {...field}
          className={inputClassName}
          id={fieldId}
          name={name}
          as="select"
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {Array.isArray(options) &&
            options.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </Field>
      </div>
      <span className={css.error}>
        {meta.touched && meta.error ? meta.error : "\u00A0"}
      </span>
    </label>
  );
}
