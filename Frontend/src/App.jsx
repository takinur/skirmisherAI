import react from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HomePage } from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/About";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import { ContactPage } from "./pages/Contact";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="*"
          element={
            <p className="text-red-400 text-7xl">There's nothing here: 404!</p>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
