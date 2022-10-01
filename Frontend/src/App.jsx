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
import { NotFound } from "./pages/Error";

import { jobs as Empjobs } from "./pages/Employer/jobs";
import { JobDetails } from "./pages/Employer/JobDetails";

import UserProfile from "./pages/Auth/UserProfile";
import { CreateUpdateJob } from "./pages/Employer/AddUpdateJob";
import { Jobs as Findwork } from "./pages/Jobs";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/find-work" element={<Findwork />} />

        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/employer/jobs" >
            <Route index element={<Empjobs />} />
            <Route path=":id/view" element={<JobDetails />} />
            <Route path="create" element={<CreateUpdateJob />} />
            <Route path=":id/edit" element={<CreateUpdateJob />} />
          </Route>


          <Route path="/logout" element={<Logout />} />
        </Route>
        {/* End Protected Routes */}
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
