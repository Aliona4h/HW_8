import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StripePage from "./pages/StripePage";
import TopBar from "./components/TopBar";
import UploadExhibit from "./pages/UploadExhibits";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPosts from "./components/MyPosts";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <TopBar />
      <div className="mt-5 pt-3">
        <Routes>
          <Route path="/" element={<StripePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute requiresAuth={true}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute requiresAuth={true}>
                <UploadExhibit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-posts"
            element={
              <ProtectedRoute requiresAuth={true}>
                <MyPosts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
