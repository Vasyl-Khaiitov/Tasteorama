import { Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

import Input from "../../common/Input/Input";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(16, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Must be a valid email!")
    .max(128, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(128, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>Register</h1>
      <p className={css.paragraph}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>

      <Formik initialValues={initialValues} validationSchema={registerSchema}>
        <Form className={css.form}>
          <Input
            name="email"
            type="email"
            placeholder="email@gmail.com"
            labelText="Enter your email address"
          />
          <Input
            name="name"
            type="text"
            placeholder="Max"
            labelText="Enter your name"
          />
          <Input
            name="password"
            type="password"
            placeholder="********"
            labelText="Create a strong password"
            showToggle={true}
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="********"
            labelText="Repeat your password"
            showToggle={true}
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />

          <button className={css.button} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
