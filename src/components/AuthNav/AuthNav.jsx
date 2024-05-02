import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  const linkActive = ({ isActive }) => {
    return clsx(css.navlink, isActive && css.active);
  };

  return (
    <div className={css.containerNav}>
      <NavLink to="/register" className={linkActive}>
        Register
      </NavLink>
      <NavLink to="/login" className={linkActive}>
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
