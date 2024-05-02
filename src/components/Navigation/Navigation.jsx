import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const linkActive = ({ isActive }) => {
    return clsx(css.navlink, isActive && css.active);
  };

  return (
    <div className={css.navigation}>
      <NavLink className={linkActive} to="/">
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink className={linkActive} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
