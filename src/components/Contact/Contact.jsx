import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import css from "./Contact.module.css";

function Contact(contact) {
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editContactUser, setEditContactUser] = useState({ ...contact });
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleModalDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleModalEdit = () => {
    setOpenEditModal(true);
  };

  const handleSave = () => {
    dispatch(editContact(editContactUser));
    setOpenEditModal(false);
    toast.success("Contact edited!");
  };

  const cancelEdit = () => {
    setOpenEditModal(false);
    setEditContactUser({ ...contact });
  };

  // useEffect(() => {
  //   setEditContactUser(editContactUser);
  // }, [editContactUser]);

  const confirmDelete = () => {
    dispatch(deleteContact(contact.id));
    toast.success("Contact deleted!");
    setOpenDeleteModal(false);
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
  };

  const contactSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Name must contain only letters")
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Enter name"),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in the format 123-45-67")
      .required("Enter number"),
  });

  const formik = useFormik({
    initialValues: {
      name: contact.name,
      number: contact.number,
    },

    onSubmit: (values) => {
      handleSave(values);
      formik.resetForm();
    },
    validationSchema: contactSchema,
  });

  return (
    <li className={css.contactCart}>
      <div>
        <p className={css.userName}>
          <span>{editContactUser.name}</span>
        </p>

        <p className={css.userNumber}>
          <span>{editContactUser.number}</span>
        </p>
      </div>

      <div>
        <button className={css.btnDel} onClick={handleModalEdit}>
          Edit
        </button>
        <button className={css.btnDel} onClick={handleModalDelete}>
          Delete
        </button>
      </div>

      <Modal
        isOpen={openEditModal}
        onRequestClose={() => setOpenEditModal(false)}
      >
        <button onClick={cancelEdit}></button>

        <form onSubmit={formik.handleSubmit}>
          <input label="name:" type="text" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
          <input
            label="number:"
            type="number"
            {...formik.getFieldProps("number")}
          />
          {formik.touched.number && formik.errors.number ? (
            <div>{formik.errors.number}</div>
          ) : null}
        </form>
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteModal}
        onRequestClose={() => setOpenDeleteModal(false)}
      >
        <button type="button" onClick={cancelDelete}></button>
        <p>Do you really want to delete this contact?</p>
        <div>
          <p>
            <span>{contact.name}</span>
          </p>

          <p>
            <span>{contact.number}</span>
          </p>
        </div>
        <div>
          <button type="button" onClick={confirmDelete}>
            Yes
          </button>
          <button type="button" onClick={cancelDelete}>
            No
          </button>
        </div>
      </Modal>
    </li>
  );
}

export default Contact;
