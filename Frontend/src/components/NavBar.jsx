import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { NavLink, Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'

import { getUserDetails } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function Navbar() {
  const [navbar, setNavbar] = useState(false)
  const [atTop, setAtTop] = useState(false)

  //Auth state
  const { user, authToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authToken && !user) {
      dispatch(getUserDetails())
    }
  }, [authToken, dispatch])

  //Scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY
      windowHeight >= 50 ? setAtTop(true) : setAtTop(false)
    }
  }

  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Feature',
      path: '/feature',
    },
    {
      name: 'Community',
      path: '/community',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ]

  return (
    <header className="header-area">
      <nav
        className={classNames(
          'navbar z-[999] h-16 w-full py-4 opacity-100 duration-300 ease-in-out dark:bg-slate-800 md:fixed md:top-0 md:left-0 md:transition-all',
          atTop ? 'md:bg-slate-50 md:py-4  md:shadow-2xl' : 'md:py-10'
        )}
      >
        <div className="container mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 xl:px-20">
          <div className="header-wrapper flex items-center justify-between">
            <div className="header-logo w-12">
              <Link to="/">
                <img src="" alt="Logo" className="bg-cover" />
              </Link>
            </div>
            {/* Mobile Nav */}
            <div className="toggle md:hidden">
              <div className="wrapper flex">{mobileNav()}</div>
              <Transition
                show={navbar}
                enter="transform transition ease duration-[500ms]"
                enterFrom="opacity-0 transform -translate-x-full"
                leaveTo="opacity-0 transform -translate-x-full duration-[600ms]"
                className="navbar-wrapper fixed top-0 left-0 z-30 h-full w-64 bg-white p-5 shadow-lg dark:bg-slate-900 md:hidden"
              >
                <div className="close">
                  <button
                    className="absolute top-0 right-0 mt-4 mr-4"
                    onClick={() => setNavbar(!navbar)}
                  >
                    <svg
                      className="h-6 w-6 dark:text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokellinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <ul className="divide-y">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        end
                        to={item.path}
                        className="my-4 mt-8 inline-block font-bold dark:text-white"
                        style={({ isActive }) => ({
                          color: isActive ? 'green' : '',
                        })}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink
                      to="/login"
                      className="my-4 mt-8 inline-block font-bold dark:text-white"
                      style={({ isActive }) => ({
                        color: isActive ? 'green' : '',
                      })}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <div className="mt-6 flex w-full items-center justify-center">
                      {user ? (
                        <Link
                          to="/dashboard"
                          className="mt-2 block rounded-full border-2 border-[#7510F7] py-1 px-6 text-[#7510F7] shadow-lg hover:bg-[#7510F7] hover:text-white dark:border-slate-200 dark:text-slate-100 md:inline-block"
                        >
                          MY DASHBOARD{' '}
                        </Link>
                      ) : (
                        <Link
                          to="/signup"
                          className="mt-2 block rounded-full border-2 border-[#7510F7] py-1 px-6 text-[#7510F7] shadow-lg hover:bg-[#7510F7] hover:text-white dark:border-slate-200 dark:text-slate-100 md:inline-block"
                        >
                          Sign Up
                        </Link>
                      )}
                    </div>
                  </li>
                </ul>
              </Transition>
            </div>
            {/* Desktop Navbar */}
            <div className="navbar hidden md:block">
              <ul className="flex space-x-8 font-semibold">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="
                      m-auto items-center justify-center text-slate-800 hover:text-emerald-600 dark:text-slate-50"
                  >
                    <NavLink
                      end
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'font-bold text-green-500' : 'b')}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                {user ? (
                  <li>
                    <Link
                      to="/dashboard"
                      className={classNames(
                        '-mt-1 block rounded-full border-2 border-[#7510F7] py-2 px-6 text-sm font-semibold text-[#7510F7] shadow-md hover:bg-[#7510F7] hover:text-white md:inline-block'
                      )}
                    >
                      My DASHBOARD
                    </Link>
                  </li>
                ) : (
                  <>
                    <li
                      className={classNames(
                        'm-auto items-center justify-center text-slate-800 hover:text-emerald-600 dark:text-slate-50'
                      )}
                    >
                      <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? 'font-bold text-green-500' : 'b')}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <Link
                        to={'/signup'}
                        className={classNames(
                          '-mt-1 block rounded-full border-2 border-[#7510F7] py-2 px-6 text-sm font-semibold text-[#7510F7] shadow-md hover:bg-[#7510F7] hover:text-white dark:text-slate-50 md:inline-block'
                        )}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )

  function mobileNav() {
    return (
      <button onClick={() => setNavbar(!navbar)}>
        {!navbar ? (
          <svg
            className="h-6 w-6 fill-current text-black dark:text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        )}
      </button>
    )
  }
}
