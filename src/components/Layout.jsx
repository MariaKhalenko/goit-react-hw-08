import { Toaster } from "react-hot-toast";
import AppHeader from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />

      <div>
        <main>
          {children}
          <Toaster position="top-center" />
        </main>
      </div>
    </>
  );
};

export default Layout;
