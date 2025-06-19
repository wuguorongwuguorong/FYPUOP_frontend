import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';

function Navbar() {
  const [isNavbarShowing, setIsNavbarShowing] = useState(false);
  // returns the current URL
  const [location] = useLocation();

  const toggleNavbar = () => {
    setIsNavbarShowing(!isNavbarShowing);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <Link href="/" className="navbar-brand">Hungry Panda</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
       
  
            <li className="nav-item">
              <Link href="/login" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                Members Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>
        
         
      
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
