import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import Search from '../Search';
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Search</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/contact" className="nav-link">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;