import react, { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { HomePage } from "./pages/HomePage";
import Login from "./pages/Login";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/About";
import Register from "./pages/Register";
// import { LoginScreen } from "./pages/LoginScree";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
      <ToastContainer />
    </>
  );
}

export default App;
