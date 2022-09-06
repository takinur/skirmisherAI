import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { NavLink, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [atTop, setAtTop] = useState(false);

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
    <>
      <nav
        className={classNames(
          "navbar h-16 py-4 md:top-0 md:left-0 w-full z-[999] md:fixed opacity-100 md:transition-all duration-300 ease-in-out",
          atTop
            ? "md:py-4 md:bg-slate-50 dark:bg-slate-800 shadow-2xl"
            : "md:py-10"
        )}
      >
        <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div className="header-wrapper flex items-center justify-between">
            <div className="header-logo w-12">
              <Link to="/">
                <img src="" alt="Logo" className="bg-cover" />
              </Link>
            </div>
            <div className="toggle md:hidden">
              <button onClick={() => setNavbar(!navbar)}>
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
              </button>
              <Transition
                show={navbar}
                enter="transition-all ease-in-out duration-500"
                enterFrom="left-80"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div name="slide-fade">
                  <div className="navbar-wrapper fixed md:hidden top-0 left-0 h-full bg-white dark:bg-slate-900 z-30 w-64 shadow-lg p-5">
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
                            // className={({ isActive }) =>
                            //   isActive ? "text-green-500 font-bold" : ""
                            // }
                            className="my-4 inline-block font-bold mt-8 dark:text-white"
                            style={({ isActive }) => ({ color: isActive ? "green" : "" })}
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                      <li>
                        <div className="flex items-center justify-center w-full mt-8"></div>
                        <div className="flex items-center justify-center w-full mt-6">
                          <button className="mt-2 py-1 px-6 text-[#7510F7] dark:text-slate-100 dark:border-slate-200 rounded-full border-2 border-[#7510F7] shadow-lg block hover:text-white md:inline-block hover:bg-[#7510F7]">
                            Talk to us
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Transition>
            </div>
            <div className="navbar hidden md:block">
              <ul className="flex space-x-8 font-semibold">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={classNames(
                      "items-center justify-center m-auto hover:text-slate-300",
                      atTop ? "text-slate-800" : "text-slate-50"
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

                <li
                  className={classNames(
                    "items-center justify-center m-auto hover:text-slate-300",
                    atTop ? "text-slate-800" : "text-slate-50"
                  )}
                >
                  <a href="#intro" className="page-scroll text-md">
                    btn
                  </a>
                </li>

                <li>
                  <button
                    className={classNames(
                      "-mt-1 py-2 px-6 text-sm font-semibold rounded-full border-2 border-[#7510F7] shadow-md block hover:text-white md:inline-block hover:bg-[#7510F7]",
                      atTop ? "text-[#7510F7]" : "text-slate-50"
                    )}
                  >
                    Talk to us
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
