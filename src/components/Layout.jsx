import { Toaster } from "react-hot-toast";
import AppHeader from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <div style={{ maxWidth: "lg", margin: "0 auto", padding: "0 20px" }}>
        <main>
          {children}
          <Toaster position="top-right" />
        </main>
      </div>
    </>
  );
};

export default Layout;
