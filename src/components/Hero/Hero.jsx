import { Formik, Form, Field } from "formik";
import css from "./Hero.module.css";
import Button from "../../common/Button/Button";

export default function Hero() {
  const initialValues = { search: "" };

  const handleSubmit = (values) => {
    console.log("Searching for:", values.search);
  };

  return (
    <section className={css.hero}>
      <div className={css.container}>
        <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <div className={css.wraper}>
              <Field
                name="search"
                type="text"
                placeholder="Search recipes"
                className={css.input}
              />

              <Button
                type="submit"
                styleType="brown"
                name="Search"
                paddingsY="13"
                aria-label="Search button"
                className={css.searchBtn}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
