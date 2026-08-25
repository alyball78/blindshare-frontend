import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/admin/AdminPage";
import CreateArticlePage from "./pages/admin/CreateArticlePage";
import EditArticlePage from "./pages/admin/EditArticlePage";
import CategoriesAdminPage from "./pages/admin/CategoriesAdminPage";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Navbar />
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/articles/new"
          element={
            <PrivateRoute role="admin">
              <CreateArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/articles/:id/edit"
          element={
            <PrivateRoute role="admin">
              <EditArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute role="admin">
              <CategoriesAdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
