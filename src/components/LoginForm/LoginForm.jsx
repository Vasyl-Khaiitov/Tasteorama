import { Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

import Input from "../../common/Input/Input";
import { useCallback, useState } from "react";
import Button from "../../common/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLoginUser } from "../../redux/auth/operations";

const initialValues = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email!")
    .max(128, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(128, "Too Long!")
    .required("Required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    async (values, actions) => {
      try {
        await dispatch(fetchLoginUser(values)).unwrap();
        navigate("/");
      } finally {
        actions.setSubmitting(false);
      }
    },
    [dispatch, navigate]
  );
  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>Login</h1>

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
              name="password"
              type="password"
              placeholder="********"
              labelText="Create a strong password"
              showToggle={true}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            <Button
              type="submit"
              styleType="brown"
              paddingsY={8}
              name="Login"
              disabled={!isValid || !dirty || isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <p className={css.footer}>
        Don't have an account?
        <NavLink to="/auth/register" className={css.linkPrimary}>
          Register
        </NavLink>
      </p>
    </div>
  );
}
