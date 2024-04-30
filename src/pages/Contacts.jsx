import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";
import { selectContacts, selectIsLoading } from "../redux/contacts/selectors";

import DocumentTitle from "../components/DocumentTitle";
import ContactList from "../components/ContsctList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";
import ContactForm from "../components/ContactForm/ContactForm";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your contacts</DocumentTitle>
      <div>
        <div>
          <ContactForm />
          <SearchBox />
        </div>
        <div>
          {Array.isArray(contacts) &&
            (contacts.length > 0 ? (
              <ContactList />
            ) : (
              <ErrorMessage message={"No contacts yet"} />
            ))}
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default Contacts;
