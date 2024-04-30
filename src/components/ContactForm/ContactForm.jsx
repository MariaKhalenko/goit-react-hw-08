import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import css from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameEdit = (name) => {
    return name.replace(/\s{2,}/g, " ").trim();
  };

  const contactFormSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Name must contain only letters")
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Enter name"),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in the format 123-45-67")
      .required("Enter number"),
  });

  const handleSubmit = ({ name, number }) => {
    const correctName = nameEdit(name);
    dispatch(addContact({ name: correctName, number }));
    formik.resetForm();
    toast.success("Contact added");
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: contactFormSchema,
  });

  return (
    <div>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div>
          <label className={css.inputTitle}>Name</label>
          <input
            className={css.input}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={css.errorMessage}>{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label className={css.inputTitle}>Number</label>
          <input
            className={css.input}
            id="number"
            name="number"
            type="text"
            placeholder="xxx-xx-xx"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.number && formik.errors.number && (
            <div className={css.errorMessage}>{formik.errors.number}</div>
          )}
        </div>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
