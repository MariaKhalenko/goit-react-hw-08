import DocumentTitle from "../../components/DocumentTitle";
import { useAuth } from "../../hooks";
import css from "./Home.module.css";
import { FcContacts } from "react-icons/fc";

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <DocumentTitle>Phonebook</DocumentTitle>
      <div className={css.homeContainer}>
        <h1 className={css.homeWelcome}>
          Welcome to Phonebook!
          <FcContacts className={css.iconTitle} />
        </h1>

        {isLoggedIn ? (
          <h2>Manage your contacts and stay in touch!</h2>
        ) : (
          <h2>Please, login or register.</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
