import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./SearchForm.module.css";
import Button from "../../common/Button/Button";

const validationSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(3, "Enter at least 3 characters")
    .required("Search field is required"),
});

export default function SearchForm({ value, onChange, onSubmit }) {
  return (
    <Formik
      initialValues={{ search: value }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values.search);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.wraper}>
            <Field name="search">
              {({ field, form }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Search recipes"
                  className={
                    form.errors.search && form.touched.search
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                  onChange={(e) => {
                    field.onChange(e); // оновлює Formik
                    onChange(e.target.value); // викликає handleChange з Hero (debounce)
                  }}
                />
              )}
            </Field>
            <Button
              type="submit"
              styleType="brown"
              name="Search"
              paddingsY="13"
              aria-label="Search button"
              className={css.searchBtn}
            />
          </div>
          <ErrorMessage name="search" component="div" className={css.error} />
        </Form>
      )}
    </Formik>
  );
}
