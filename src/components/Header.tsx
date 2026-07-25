import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">📖</span>
          <h1>Bible@500</h1>
        </Link>
        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 