import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import css from "./Contact.module.css";
import {
  FaUserLarge,
  FaPhone,
  FaTrashCan,
  FaPenToSquare,
} from "react-icons/fa6";

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
    setEditContactUser({
      ...editContactUser,
      name: formik.values.name,
      number: formik.values.number,
    });

    dispatch(editContact(editContactUser));
    setOpenEditModal(false);
    toast.success("Contact edited!");
  };

  const cancelEdit = () => {
    setOpenEditModal(false);
    setEditContactUser({ ...contact });
  };

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
      .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
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
          <FaUserLarge size="15px" />
          <span>{editContactUser.name}</span>
        </p>

        <p className={css.userNumber}>
          <FaPhone />
          <span>{editContactUser.number}</span>
        </p>
      </div>

      <div className={css.containerBtn}>
        <button className={css.btnContact} onClick={handleModalEdit}>
          Edit <FaPenToSquare className={css.iconBtn} />
        </button>
        <button className={css.btnContact} onClick={handleModalDelete}>
          Delete
          <FaTrashCan className={css.iconBtn} />
        </button>
      </div>

      <Modal
        className={css.modalWindow}
        isOpen={openEditModal}
        onRequestClose={() => setOpenEditModal(false)}
      >
        <form className={css.modalForm} onSubmit={formik.handleSubmit}>
          <div className={css.containerModal}>
            <label className={css.inputTitle}>Name</label>
            <input
              className={css.modalInput}
              {...formik.getFieldProps("name")}
            />

            {formik.touched.name && formik.errors.name ? (
              <div className={css.errorMessage}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={css.containerModal}>
            <label className={css.inputTitle}>Number</label>
            <input
              className={css.modalInput}
              {...formik.getFieldProps("number")}
            />

            {formik.touched.number && formik.errors.number ? (
              <div className={css.errorMessage}>{formik.errors.number}</div>
            ) : null}
          </div>
        </form>
        <div className={css.containerModalBtn}>
          <button className={css.btnModal} type="button" onClick={handleSave}>
            Save
          </button>
          <button className={css.btnModal} type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        className={css.modalWindow}
        isOpen={openDeleteModal}
        onRequestClose={() => setOpenDeleteModal(false)}
      >
        <p className={css.textModal}>
          Do you really want to delete this contact?
        </p>

        <div className={css.containerModalBtn}>
          <button
            className={css.btnModal}
            type="button"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button className={css.btnModal} type="button" onClick={cancelDelete}>
            No
          </button>
        </div>
      </Modal>
    </li>
  );
}

export default Contact;
