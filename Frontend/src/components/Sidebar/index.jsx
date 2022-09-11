import React from "react";
import ClassNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = ({ navbar, toggleNavbar }) => {
  const { user } = useSelector((state) => state.auth);

  let MenuItems = [];
  //Conditionally render menu items based on user role
  if (user.role === "EMPLOYER") {
    MenuItems = [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: IconOne,
      },
      {
        name: "Setting",
        description: "Change your password and other settings",
        link: "/user/setting",
        icon: IconTwo,
      },
      {
        name: "Help",
        description: "Get help with using the platform",
        link: "/help",
        icon: IconThree,
      },
    ];
  } else if (user.role === "CANDIDATE") {
    MenuItems = [
      {
        name: "Profile",
        description: "View and modify your profile",
        href: "/user/profile",
        icon: IconThree,
      },
      {
        name: "Setting",
        description: "Change your password and other settings",
        href: "/user/setting",
        icon: IconTwo,
      },
      {
        name: "Help",
        description: "Get help with using the platform",
        href: "/help",
        icon: IconThree,
      },
    ];
  }

  console.table(MenuItems);
  // console.log("from sidebar", menu);
  //TODO: Render menu items from a Array of objects
  //Change icons
  //Create profile section
  //Create fancy animation
  return (
    <aside
      className={ClassNames(
        "z-30 fixed top-0 left-0 flex-shrink-0 min-h-screen w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block",
        navbar ? "block" : "hidden"
      )}
    >
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <div className="w-full flex justify-between pr-2">
          <Link
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="/dashboard"
          >
            SkirmisherAI
          </Link>
          <svg
            onClick={toggleNavbar}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </div>
        <ul className="mt-6">
          {MenuItems.map((item) => (
            <li className="relative px-6 py-3" key={item.name}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "[--child-opacity:1] side-nav-link"
                    : " side-nav-link"
                }
                to={item.link}
              >
                <span
                  className="opacity-[var(--child-opacity,0)] absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
                <item.icon aria-hidden="true" />

                <span className="ml-4">{item.name}</span>
              </NavLink>
            </li>
          ))}
          <li className="relative px-6 py-3">
            <NavLink
              to="/user/profile"
              aria-current="page"
              className={({ isActive }) =>
                isActive
                  ? "[--child-opacity:1] side-nav-link"
                  : " side-nav-link"
              }
            >
              <span
                className="opacity-[var(--child-opacity,0)] absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>

              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span className="ml-4">Profile</span>
            </NavLink>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="/app/cards"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span className="ml-4">Cards</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="/app/charts"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
              </svg>
              <span className="ml-4">Charts</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="/app/buttons"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
              </svg>
              <span className="ml-4">Buttons</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="/app/modals"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span className="ml-4">Modals</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              href="/app/tables"
            >
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span className="ml-4">Tables</span>
            </a>
          </li>
          <li className="relative px-6 py-3">
            <button
              className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              aria-haspopup="true"
            >
              <span className="inline-flex items-center">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
                <span className="ml-4">Pages</span>
              </span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
        <div className="px-6 my-6">
          <button
            className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
            type="button"
          >
            Create account
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

function IconOne() {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
    </svg>
  );
}

function IconThree() {
  return (
    <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
  </svg>
  );
}
