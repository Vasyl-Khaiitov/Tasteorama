import { useId } from "react";
import css from "./Input.module.css";
import { ErrorMessage, Field, useField } from "formik";

export default function Input({ name, type, placeholder, labelText }) {
  const fieldId = useId();

  const [field, meta] = useField(name);

  const inputClassName = `${
    meta.touched && meta.error ? css.inputError : css.inputName
  }`;

  return (
    <label className={css.labelName} htmlFor={fieldId}>
      {labelText}
      <Field
        {...field}
        className={inputClassName}
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <span className={css.error}>
        {meta.touched && meta.error ? meta.error : "\u00A0"}
      </span>
    </label>
  );
}
