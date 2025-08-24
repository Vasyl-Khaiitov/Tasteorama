import "modern-normalize";

import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";

import { RestrictedRoute } from "./RestrictedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import Header from "./Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/auth/operations";

import { selectUserIsRefresh } from "../redux/auth/selectors";

import { ToastContainer } from "react-toastify";
import Loader from "./Loader/Loader";
import { deleteAuthorizationToken, setAuthorizationToken } from "../api/api";
import { lsGetToken } from "../utils/localStorage";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const RecipePage = lazy(() => import("../pages/RecipeViewPage/RecipeViewPage"));
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
    <>
      <Header />
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/:authType" element={<AuthPage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/profile/:recipeType" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}