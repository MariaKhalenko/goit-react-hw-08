import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks";
import { logOut } from "../../redux/auth/operations";

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
    <div>
      <span>Hello, {sliceText(user.name, 20)}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
