import{ React, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isLoggedIn, onLogout }) => {
 
  const navigate = useNavigate();

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s',
    fontFamily: 'Montserrat, sans-serif'
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      onLogout()
      navigate("/signin");
      setDropdownOpen(false);
      localStorage.removeItem("isLoggedIn");
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div>
    {isLoggedIn ? (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '100%' }}>
      <div className="d-flex justify-content-between align-items-center">
      <span className="fs-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Shampy
      </span>

      {/* Settings Button */}
      <div className={`dropdown ml-2 ${dropdownOpen ? 'show' : ''}`}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="settings-dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={toggleDropdown}
        >
          <FaCog />
        </button>
        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="settings-dropdown">
          <a className="dropdown-item" href="#admin-profile">Admin Profile</a>
         <a className="dropdown-item" onClick={handleLogout} >Logout</a>
        </div>
      </div>
    </div>
      <hr />
      <div className="nav nav-pills flex-column mb-auto">
        NAVIGATION
        <div className="nav-item pt-2">
          <NavLink to="/dashboard" className="nav-link"  style={navLinkStyle} >
            View Dashboard
          </NavLink>
        </div>
        <div className="nav-item pt-2">
          <NavLink to="/viewads" className="nav-link"  style={navLinkStyle} >
            View Ads
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/viewusers" className="nav-link" style={navLinkStyle} >
            View Users
          </NavLink>
        </div>
        <div className="nav-item pb-2">
          <NavLink to="/Viewservices" className="nav-link" style={navLinkStyle} >
            View Services
          </NavLink>
        </div>
        <div className="nav-item pb-2">
          <NavLink to="/blockeduser" className="nav-link" style={navLinkStyle} >
            Blocked Users
          </NavLink>
        </div>
        <div className="nav-item pb-2">
          <NavLink to="/reports" className="nav-link" style={navLinkStyle} >
           View Reports
          </NavLink>
        </div>
        <div className="nav-item pb-2">
          <NavLink to="/contactus" className="nav-link" style={navLinkStyle} >
           View Contact Us
          </NavLink>
        </div>
        LAYOUT
        <div className="nav-item pt-2">
          <NavLink to="/homeimage" className="nav-link" style={navLinkStyle} >
            Home Page
          </NavLink>
        </div>
      </div>
    </div>
    ):(
      null
    )}
    </div>
  );
};

export default Sidebar;
