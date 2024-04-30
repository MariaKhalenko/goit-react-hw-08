import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
