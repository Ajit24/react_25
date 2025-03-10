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
        {/* <li><Link to="/Scroll" className="nav-link">ScrollImages</Link></li> */}
        <li><Link to="/tabs" className="nav-link">Tabs_Form</Link></li>
        <li><Link to="/pagination" className="nav-link">Pagination</Link></li>
        <li><Link to="/otp" className="nav-link">OTP</Link></li>
        <li><Link to="/file" className="nav-link">nested_file</Link></li>
        <li><Link to="/nested" className="nav-link">nested_file2</Link></li>
        <li><Link to="/carousel" className="nav-link">carousel</Link></li>
        <li><Link to="/hooks" className="nav-link">custom_hook</Link></li>
        <li><Link to="/fetchdata" className="nav-link">FetchDataHook</Link></li>
        <li><Link to="/multisearch" className="nav-link">Multiple Filters</Link></li>
        <li><Link to="/allcheckboxes" className="nav-link">AllCheckboxes</Link></li>
        {/* <li><Link to="/linkpreviewer" className="nav-link">Linkpreview</Link></li> */}
        {/* <li><Link to='/test' className='nav-link'>Test</Link></li> */}
        <li><Link to='/dragdrop' className='nav-link'>DragDrop</Link></li>
        <li><Link to='/infinite-scroll' className='nav-link'>infinite_scroll</Link></li>
        <li><Link to='/list' className='nav-link'>VirtualizedList</Link></li>






        


        



      </ul>
    </nav>
  );
};

export default Navbar;