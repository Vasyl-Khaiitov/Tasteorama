import "modern-normalize";

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const RecipePage = lazy(() => import("../pages/RecipeViewPage/RecipeViewPage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));

export default function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/:authType" element={<AuthPage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/profile/:recipeType" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </Layout>
      ;
    </>
  );
}
