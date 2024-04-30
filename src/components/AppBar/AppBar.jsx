import { useAuth } from "../../hooks";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <div>
        <Navigation />
        <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
      </div>
    </header>
  );
};

export default AppBar;
