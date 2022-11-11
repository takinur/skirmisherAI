import react from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './hooks/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './pages'
import Login from './pages/Auth/Login'
import { AboutPage } from './pages/About'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import { ContactPage } from './pages/Contact'
import Logout from './pages/Auth/Logout'
import { NotFound } from './pages/Error'
import { Findwork } from './pages/Findwork'

import { jobs as Empjobs } from './pages/Employer/jobs'
import { JobDetails } from './pages/Employer/JobDetails'
import { CreateUpdateJob } from './pages/Employer/AddUpdateJob'
import { Reports as Empreports } from './pages/Employer/Reports'

import UserProfile from './pages/Auth/UserProfile'

import { Jobs as CandJobs } from './pages/Candidate/Jobs'

import { VideoMeet } from './pages/Meet'
import Blog from './pages/Blog'
import { SinglePost as SingleBlogPost } from './pages/Blog/single'
import { BlogList } from './pages/Blog/BlogList'
import { CreateUpdateBlog } from './pages/Blog/AddUpdateBlog'
import { DashSingleBlogPost } from './pages/Blog/DashSingle'
import UserSetting from './pages/Auth/UserSetting'
import TermsPolicy from './pages/TermsPolicy'

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
          <Route path="/user/setting" element={<UserSetting />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="applicant/jobs" element={<CandJobs />} />

          <Route path="/employer/jobs">
            <Route index element={<Empjobs />} />
            <Route path=":id/view" element={<JobDetails />} />
            <Route path="create" element={<CreateUpdateJob />} />
            <Route path=":id/edit" element={<CreateUpdateJob />} />
          </Route>
          <Route path="/employer/report" element={<Empreports />} />

          <Route path="/community-blog">
            <Route index element={<BlogList />} />
            <Route path=":slug/view" element={<DashSingleBlogPost />} />
            <Route path="create" element={<CreateUpdateBlog />} />
            <Route path=":slug/edit" element={<CreateUpdateBlog />} />
          </Route>

          <Route path="/logout" element={<Logout />} />
        </Route>
        {/* End Protected Routes */}

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<ContactPage />} />
        <Route path="/terms-and-condition" element={<TermsPolicy />} />
        <Route path="/meet" element={<VideoMeet />} />
        <Route path="/meet/:code" element={<VideoMeet />} />
        <Route path="/community">
          <Route index element={<Blog />} />
          <Route path=":slug" element={<SingleBlogPost />} />
        </Route>
        {/* terms-and-condition */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
