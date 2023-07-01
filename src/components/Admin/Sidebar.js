import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggle }) {
    return (
        <aside className={isOpen ? 'sidebar open' : 'sidebar close'}>
            <button className="sidebar-toggle" onClick={toggle}>
                <i className="fas fa-times" />
            </button>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <Link to="/" className="sidebar-link" onClick={toggle}>
                        Home
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/about" className="sidebar-link" onClick={toggle}>
                        About
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/services" className="sidebar-link" onClick={toggle}>
                        Services
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/contact" className="sidebar-link" onClick={toggle}>
                        Contact
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;