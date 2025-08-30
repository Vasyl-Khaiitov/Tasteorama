import { useEffect } from "react";
import { useImageDrop } from "../useImageDrop";
import css from "./ImageUploadSection.module.css";

export default function ImageUploadSection({ setFieldValue, resetTrigger }) {
  const {
    imagePreview,
    isDragging,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clearImage,
  } = useImageDrop(setFieldValue);

  useEffect(() => {
    if (resetTrigger) {
      clearImage(); // 🔥 очищення після сабміту
    }
  }, [resetTrigger]);

  return (
    <>
      <h2>Upload Photo</h2>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <label
        htmlFor="fileInput"
        className={`${css.uploadBox} ${isDragging ? css.dragging : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className={css.previewImg} />
        ) : (
          <span>{isDragging ? "Drop Image" : "Click or Drag"}</span>
        )}
      </label>
    </>
  );
}
