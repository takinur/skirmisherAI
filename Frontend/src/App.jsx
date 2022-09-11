import react from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HomePage } from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import { AboutPage } from "./pages/About";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import { ContactPage } from "./pages/Contact";
import Footer from "./components/Footer";
import Logout from "./pages/Auth/Logout";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        {/* End Protected Routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={
            <p className="text-red-400 text-7xl">There's nothing here: 404!</p>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
