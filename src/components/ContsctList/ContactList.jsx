import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import Contact from "../Contact/Contact";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./ContactList.module.css";

function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return Array.isArray(contacts) && contacts.length > 0 ? (
    <ul className={css.contactList}>
      {contacts.map((contact) => (
        <Contact key={contact.id} {...contact} />
      ))}
    </ul>
  ) : (
    <div>
      <ErrorMessage
        className={css.textMessage}
        message={"No such contact exists"}
      />
    </div>
  );
}

export default ContactList;
