import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import { FaEnvelope, FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa6";
import css from "./LoginForm.module.css";
import { toast } from "react-hot-toast";

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const UserLoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter email!"),
    password: Yup.string()
      .required("Enter password!")
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
    <form className={css.loginForm} onSubmit={formik.handleSubmit}>
      <div className={css.containerForm}>
        <label className={css.inputTitle}>Email</label>
        <input
          className={css.input}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />{" "}
        <FaEnvelope className={css.iconLogin} size="18" />
        {formik.touched.email && formik.errors.email && (
          <div className={css.errorMessage}>{formik.errors.email}</div>
        )}
      </div>
      <div className={css.containerForm}>
        <label className={css.inputTitle}>Password</label>
        <input
          className={css.input}
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />{" "}
        <FaLock className={css.iconLogin} size="17" />
        {formik.touched.password && formik.errors.password && (
          <div className={css.errorMessage}>{formik.errors.password}</div>
        )}
        <button
          className={css.btnIcons}
          type="button"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? (
            <FaRegEye className={css.iconsPass} />
          ) : (
            <FaRegEyeSlash className={css.iconsPass} />
          )}{" "}
        </button>
      </div>
      <button className={css.button} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
