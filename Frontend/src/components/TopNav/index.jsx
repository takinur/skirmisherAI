import React, { useState } from "react";
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";

import useDarkMode from "../../hooks/useDarkMode";

const TopNavigation = () => {
  
  return (
    <div className="top-navigation">
      <FaBars className="ml-4 mr-auto md:hidden" />
      <HashtagIcon />
      <Title />
      <ThemeIcon />
      <BellIcon />
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon" />;

const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = () => <h5 className="title-text">tailwind-css</h5>;

export default TopNavigation;
