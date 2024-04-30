import DocumentTitle from "../components/DocumentTitle";
import { useAuth } from "../hooks";

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <DocumentTitle>Phonebook</DocumentTitle>
      <div>
        <h1>Welcome to Phonebook!</h1>
        {isLoggedIn ? (
          <h2>Manage your contacts and stay in touch!</h2>
        ) : (
          <>
            <h2>Please, log in or register.</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
