import "modern-normalize";
import styles from "./App.module.css";

import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";

import PrivateRoute from "./PrivateRoute";

import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import Header from "./Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/auth/operations";
import Footer from "./Footer/Footer";
import { selectUserIsRefresh } from "../redux/auth/selectors";

import { ToastContainer } from "react-toastify";
import Loader from "./Loader/Loader";
import { deleteAuthorizationToken, setAuthorizationToken } from "../api/api";
import { lsGetToken } from "../utils/localStorage";
import { RestrictedRoute } from "./RestrictedRoute";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const RecipeViewPage = lazy(() =>
  import("../pages/RecipeViewPage/RecipeViewPage")
);
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectUserIsRefresh);

  useEffect(() => {
    const token = lsGetToken();
    if (token) {
      setAuthorizationToken(token);
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => {
          deleteAuthorizationToken();
        });
    }
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <div className={styles.appWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/auth/:authType"
                element={
                  <RestrictedRoute component={<AuthPage />} redirectTo="/" />
                }
              />
              <Route path="/recipes/:recipeId" element={<RecipeViewPage />} />
              <Route
                path="/add-recipe"
                element={
                  <PrivateRoute
                    component={<AddRecipePage />}
                    redirectTo="/auth/login"
                  />
                }
              />
              <Route
                path="/profile/:recipeType"
                element={
                  <PrivateRoute
                    component={<ProfilePage />}
                    redirectTo="/auth/login"
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
