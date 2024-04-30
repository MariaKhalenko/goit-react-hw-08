import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";

import { toast } from "react-hot-toast";

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const UserLoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(5, "Password must be at least 5 characters!")
      .max(15, "Password must be at most 15 characters!"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Hello!");
        resetForm();
      })
      .catch((err) => {
        if (err === 400) {
          toast.error("The user with this name and password does not exist!");
        } else {
          toast.error("Oops! Something went wrong! Error: ", err);
        }
      });
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_DATA,
    onSubmit: handleSubmit,
    validationSchema: UserLoginSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
          <button
            type="button"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
