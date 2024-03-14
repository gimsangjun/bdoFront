// Header.js
import React from "react";

// #27344E
const Header = () => {
  return (
    <nav className="text-white p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">MyApp</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-blue-200">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
