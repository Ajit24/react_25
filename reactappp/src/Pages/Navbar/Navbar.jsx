import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import Search from '../Search';
import ScrollImages from '../Scroll/ScrollImages';
import TabForm from '../TabForm/TabForm';
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Search</Link></li>
        <li><Link to="/Scroll" className="nav-link">ScrollImages</Link></li>
        <li><Link to="/tabs" className="nav-link">Tabs form</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;