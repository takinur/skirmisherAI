import React, { useState, useEffect } from "react";
import classNames from "classnames";

export default function Navbar() {
  const [stickyClass, setStickyClass] = useState("relative");
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
      //   windowHeight >= 50
      //     ? setStickyClass("md:py-4 md:bg-slate-50 dark:bg-slate-800 shadow-2xl")
      //     : setStickyClass("md:py-10");
      windowHeight >= 50 ? setAtTop(true) : setAtTop(false);
    }
  };

  return (
    <>
      <nav
        className={classNames(
          "navbar h-16 py-4 md:top-0 md:left-0 w-full z-50 md:fixed opacity-100 md:transition-all duration-300 ease-in-out",
          atTop
            ? "md:py-4 md:bg-slate-50 dark:bg-slate-800 shadow-2xl"
            : "md:py-10"
        )}
      >
        <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div className="header-wrapper flex items-center justify-between">
            <div className="header-logo w-12">
              <a href="/">
                <img src="" alt="Logo" className="bg-cover" />
              </a>
            </div>
            <div className="toggle md:hidden">
              <button>
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
                btn
              </button>
            </div>
            <div className="navbar hidden md:block">
              <ul className="flex space-x-8 font-semibold">
                <li className="items-center justify-center m-auto text-slate-50 hover:text-slate-300 dark:!text-slate-400 dark:hover:!text-slate-100">
                  <a href="#intro" className="page-scroll text-md">
                    About
                  </a>
                </li>

                <li>
                  <div className="flex items-center justify-center w-full">
                    TOGGLES
                  </div>
                </li>
                <li>
                  <button className={classNames("-mt-1 py-2 px-6 text-sm font-semibold rounded-full border-2 border-[#7510F7] shadow-md block hover:text-white md:inline-block hover:bg-[#7510F7]", atTop ? "text-[#7510F7]" : "text-slate-50")}>
                    Say Hello
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
