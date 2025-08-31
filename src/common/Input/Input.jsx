import { useId } from "react";
import css from "./Input.module.css";
import { ErrorMessage, Field, useField } from "formik";
import Icon from "../../shared/Icon";

export default function Input({
  name,
  type,
  placeholder,
  labelText,
  showToggle = false,
  show,
  onToggle,
  onChange,
  // value,
  labelClassName,
  className,
  errorClassName,
}) {
  const fieldId = useId();

  const [field, meta] = useField(name);

  const inputNameCase = `${css.inputName} ${className || ""}`;
  const inputErrorCase = errorClassName ? css[errorClassName] : css.inputError;

  // const inputClassName = `${
  //   meta.touched && meta.error ? css.inputError : css.inputName
  // }`;

  const inputClassName = `${
    meta.touched && meta.error ? inputErrorCase : inputNameCase
  }`;

  const labelName = labelClassName ? css[labelClassName] : css.labelName;

  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className={labelName} htmlFor={fieldId}>
      {labelText}
      <div className={css.inputWrapper}>
        <Field
          {...field}
          className={inputClassName}
          id={fieldId}
          name={name}
          type={showToggle ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={handleChange}
          // value={value}
        />
        {showToggle && (
          <button
            type="button"
            className={css.eyeButton}
            onClick={onToggle}
            aria-label={show ? "Hide password" : "Show password"}
          >
            <Icon
              name={show ? "eye-open" : "eye-crossed"}
              classname={css.eyeIcon}
            />
          </button>
        )}
      </div>
      <span className={css.error}>
        {meta.touched && meta.error ? meta.error : "\u00A0"}
      </span>
    </label>
  );
}
