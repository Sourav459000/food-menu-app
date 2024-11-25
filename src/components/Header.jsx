import React from "react";
import logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white text-gray-800 shadow-md lg:px-40">
      <div className="container mx-auto grid grid-flow-row items-center py-2 px-3 sm:grid-cols-2 md:flex md:justify-between md:py-3 md:px-4 lg:py-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center justify-start space-x-2">
          <img src={logo} alt="Logo" className="my-2 mx-2 h-10 lg:h-12 w-auto" />
        </div>

        {/* Search Bar */}
        <div className="flex w-full items-center justify-end lg:w-[70%] md:w-[50%] max-w-md bg-gray-100 rounded-xl overflow-hidden shadow-sm col-span-2 md:col-span-1">
          <input
            type="text"
            className="px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 text-gray-800 focus:outline-none bg-transparent w-full"
            placeholder="Search for restaurant and food"
          />
          <button
            className="text-gray-400 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded-full"
            type="button"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
