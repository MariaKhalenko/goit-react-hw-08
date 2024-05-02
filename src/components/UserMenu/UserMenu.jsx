import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const sliceText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length).trim() + "...";
    }
    return text;
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.containerHello}>
      <span className={css.helloUser}>Hello, {sliceText(user.name, 20)}</span>
      <button onClick={handleLogout} className={css.btn}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
