import { Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

import Input from "../../common/Input/Input";
import { useCallback, useState } from "react";
import Button from "../../common/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegisterUser } from "../../redux/auth/operations";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values, actions) => {
      try {
        const { name, email, password } = values;

        await dispatch(fetchRegisterUser({ name, email, password })).unwrap();
        navigate("/");
      } finally {
        actions.setSubmitting(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>Register</h1>
      <p className={css.paragraph}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
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
              type={showPassword ? "text" : "password"}
              placeholder="********"
              labelText="Create a strong password"
              showToggle={true}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
            <Input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              labelText="Repeat your password"
              showToggle={true}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            <Button
              type="submit"
              styleType="transparent"
              paddingsY={8}
              name="Create account"
              disabled={!isValid || !dirty || isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <p className={css.footer}>
        Already have an account?
        <NavLink to="/auth/login" className={css.linkPrimary}>
          Log in
        </NavLink>
      </p>
    </div>
  );
}
