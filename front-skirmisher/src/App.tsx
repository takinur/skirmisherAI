import react, { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/About";

function App() {
  return (
    <>
      <AuthContextProvider>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ProtectedRoutes */}
        {/* <Route path="/about" element={<ProtectedRoute />}>
          <Route path="/about" element={<AboutPage />} />
        </Route> */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
