import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refresh } from "../redux/auth/operations";
import { useAuth } from "../hooks";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login"));
const Contacts = lazy(() => import("../pages/Contacts"));
const Register = lazy(() => import("../pages/Register"));

import Layout from "./Layout";
import Loader from "./Loader/Loader";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <Register />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <Login />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <Contacts />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
