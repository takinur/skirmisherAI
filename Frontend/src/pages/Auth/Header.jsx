import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({children}) => {
  return (
    <header className="header-sr">
        <nav className="navbar h-16 py-4 md:top-0 bg-zinc-50 md:left-0 w-full z-[999] md:fixed opacity-100 md:transition-all duration-300 ease-in-out">
          <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto max-w-screen-2xl">
            <div className="header-wrapper flex items-center justify-between">
              <div className="header-logo w-12">
                <Link to="/">
                  <img src="" alt="Logo" className="bg-cover" />
                </Link>
              </div>
              <div className="navbar hidden md:block">
                <ul className="flex space-x-8 font-semibold">
                  <li>
                   {children}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
  )
}

export default Header