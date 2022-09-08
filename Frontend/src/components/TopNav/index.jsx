import React from "react";
import { 
  FaHashtag,
  FaRegBell,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";

import useDarkMode from "../../hooks/useDarkMode";

const TopNavigation = ({toggleNavbar}) => {
  
  return (
    <div className="top-navigation">
      <FaBars className="ml-4 mr-auto md:hidden dark:text-zinc-100" onClick={toggleNavbar} />
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
        <FaSun size="24" className="top-navigation-icon mr-4" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon mr-4" />
      )}
    </span>
  );
};

const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon mr-4" />;

const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = () => <h5 className="title-text">tailwind-css</h5>;

export default TopNavigation;
