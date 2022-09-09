import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { NavLink, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

import { getUserDetails } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [atTop, setAtTop] = useState(false);

  //Auth state
  const { user, authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) {
      dispatch(getUserDetails());
    }
  }, [authToken, dispatch]);

  //Scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight >= 50 ? setAtTop(true) : setAtTop(false);
    }
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Feature",
      path: "/feature",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header className="header-area">
      <nav
        className={classNames(
          "navbar h-16 py-4 dark:bg-slate-800 md:top-0 md:left-0 w-full z-[999] md:fixed opacity-100 md:transition-all duration-300 ease-in-out",
          atTop ? "md:py-4 md:bg-slate-50  md:shadow-2xl" : "md:py-10"
        )}
      >
        <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto max-w-screen-2xl">
          <div className="header-wrapper flex items-center justify-between">
            <div className="header-logo w-12">
              <Link to="/">
                <img src="" alt="Logo" className="bg-cover" />
              </Link>
            </div>
            <div className="toggle md:hidden">
              <div className="wrapper flex">
                <div className="mr-4 mt-[2px]">
                  <ThemeIcon />
                </div>
                {mobileNav()}
              </div>
              <Transition
                show={navbar}
                enter="transform transition ease duration-[500ms]"
                enterFrom="opacity-0 transform -translate-x-full"
                leaveTo="opacity-0 transform -translate-x-full duration-[600ms]"
                className="navbar-wrapper fixed md:hidden top-0 left-0 h-full bg-white dark:bg-slate-900 z-30 w-64 shadow-lg p-5"
              >
                <div className="close">
                  <button
                    className="absolute top-0 right-0 mt-4 mr-4"
                    onClick={() => setNavbar(!navbar)}
                  >
                    <svg
                      className="w-6 h-6 dark:text-white"
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
                        to={item.path}
                        className="my-4 inline-block font-bold mt-8 dark:text-white"
                        style={({ isActive }) => ({
                          color: isActive ? "green" : "",
                        })}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <NavLink
                      to="/login"
                      className="my-4 inline-block font-bold mt-8 dark:text-white"
                      style={({ isActive }) => ({
                        color: isActive ? "green" : "",
                      })}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <div className="flex items-center justify-center w-full mt-6">
                      {user ? (
                        <Link
                          to="/dashboard"
                          className="mt-2 py-1 px-6 text-[#7510F7] dark:text-slate-100 dark:border-slate-200 rounded-full border-2 border-[#7510F7] shadow-lg block hover:text-white md:inline-block hover:bg-[#7510F7]"
                        >
                          MY DASHBOARD{" "}
                        </Link>
                      ) : (
                        <Link
                          to="signup"
                          className="mt-2 py-1 px-6 text-[#7510F7] dark:text-slate-100 dark:border-slate-200 rounded-full border-2 border-[#7510F7] shadow-lg block hover:text-white md:inline-block hover:bg-[#7510F7]"
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
                    className={classNames(
                      "items-center justify-center m-auto hover:text-emerald-600",
                      atTop
                        ? "text-slate-800 dark:text-slate-50"
                        : "text-slate-50"
                    )}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "text-green-500 font-bold" : "b"
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-2">
                  <ThemeIcon />
                </li>
                {user ? (
                  <li>
                    <Link
                      to="/dashboard"
                      className={classNames(
                        "-mt-1 py-2 px-6 text-sm font-semibold rounded-full border-2 border-[#7510F7] shadow-md block hover:text-white md:inline-block hover:bg-[#7510F7]",
                        atTop
                          ? "text-[#7510F7] dark:text-slate-50"
                          : "text-slate-50"
                      )}
                    >
                      My DASHBOARD
                    </Link>
                  </li>
                ) : (
                  <>
                    <li
                      className={classNames(
                        "items-center justify-center m-auto hover:text-emerald-600",
                        atTop
                          ? "text-slate-800 dark:text-slate-50"
                          : "text-slate-50"
                      )}
                    >
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive ? "text-green-500 font-bold" : "b"
                        }
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className={classNames(
                          "-mt-1 py-2 px-6 text-sm font-semibold rounded-full border-2 border-[#7510F7] shadow-md block hover:text-white md:inline-block hover:bg-[#7510F7]",
                          atTop
                            ? "text-[#7510F7] dark:text-slate-50"
                            : "text-slate-50"
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
  );

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
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        )}
      </button>
    );
  }
}

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="22" className="top-navigation-icon" />
      ) : (
        <FaMoon size="22" className="top-navigation-icon" />
      )}
    </span>
  );
};
