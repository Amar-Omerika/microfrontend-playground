import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Micro Frontend Demo</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/app1" className="hover:text-blue-300 transition-colors">App 1</Link>
            </li>
            <li>
              <Link to="/app2" className="hover:text-blue-300 transition-colors">App 2</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
