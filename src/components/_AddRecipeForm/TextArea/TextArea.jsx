import { useId } from "react";
import css from "./TextArea.module.css";
import { ErrorMessage, Field, useField } from "formik";

export default function TextArea({ name, placeholder, labelText, rows, cols }) {
  const fieldId = useId();

  const [field, meta] = useField(name);

  const inputClassName = `${
    meta.touched && meta.error ? css.inputError : css.inputName
  }`;

  return (
    <label className={css.labelName} htmlFor={fieldId}>
      {labelText}
      <div className={css.inputWrapper}>
        <Field
          {...field}
          className={inputClassName}
          id={fieldId}
          name={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          as="textarea"
        />
      </div>
      <span className={css.error}>
        {meta.touched && meta.error ? meta.error : "\u00A0"}
      </span>
    </label>
  );
}
