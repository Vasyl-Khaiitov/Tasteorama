import { useFormikContext, ErrorMessage } from "formik";
import { useImageDrop } from "../useImageDrop";
import css from "./ImageUploadSection.module.css";
import Icon from "../../../shared/Icon";

export default function ImageUploadSection({ setFieldValue }) {
  const { values, errors, touched } = useFormikContext();
  const { thumb } = values;

  const {
    imagePreview,
    isDragging,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useImageDrop(setFieldValue, thumb);
  const hasError = errors.thumb && touched.thumb;

  return (
    <div className={css.photoSection}>
      <input
        name="thumb"
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className={`${css.uploadBox} 
          ${isDragging ? css.dragging : ""} 
          ${hasError ? css.errorBorder : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className={css.previewImg} />
        ) : (
          <Icon name="photo" classname={css.photoIcon} />
        )}
      </label>
      <ErrorMessage name="thumb">
        {(msg) => <div className={css.error}>{msg}</div>}
      </ErrorMessage>
    </div>
  );
}
