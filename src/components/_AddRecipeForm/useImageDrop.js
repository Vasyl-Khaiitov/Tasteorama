import { useEffect, useState } from "react";

export const useImageDrop = (setFieldValue, thumb, setFieldTouched) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFieldTouched("thumb", true);
    if (file) {
      setFieldValue("thumb", file); // синхронізуємо з Formik
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setFieldTouched("thumb", true); // ✅ робимо touched одразу
    if (file) {
      setFieldValue("thumb", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!thumb) {
      setImagePreview(null);
    }
  }, [thumb]);

  return {
    isDragging,
    imagePreview,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
};
