import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const nameEdit = (name) => {
    return name.replace(/\s{2,}/g, " ").trim();
  };

  const UserRegisterSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Name must contain only letters")
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Enter name"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(5, "Password must be at least 5 characters!")
      .max(15, "Password must be at most 15 characters!"),
  });

  const handleSubmit = ({ name, email, password }, { resetForm }) => {
    const normalizedName = nameEdit(name);
    dispatch(register({ name: normalizedName, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Hello!");
        resetForm();
      })
      .catch((err) => {
        if (err === 400) {
          toast.error("The user with this email is already registered.");
        } else {
          toast.error("Oops! Something went wrong! Error: ", err);
        }
      });
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_DATA,
    onSubmit: handleSubmit,
    validationSchema: UserRegisterSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>
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
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
