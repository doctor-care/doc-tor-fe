import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
    const [click, setClick] = useState(false);
    const [left, setLeft] = useState('-100%');

    const handleClick = () => {
        setClick(!click);
        setLeft(click ? '-100%' : 0);
    };

    const closeMobileMenu = () => {
        setClick(false);
        setLeft('-100%');
    };

    return (
        <>
            <nav className="navbarAdmin">
                <div className="navbar-container">
                    <button  className="navbar-logo" onClick={toggleSidebar}>
                        ///
                    </button>
                    <div className="flex justify-center py-4">
                <Link to={'/'}>
                    <img src="/logo.png" alt="logo" className="w-56 h-20 object-cover" />
                </Link>
            </div>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/listDoc" className="nav-links" onClick={closeMobileMenu}>
                                Bác sĩ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link as={Link} to="/chatAD" className="nav-link scrollto">
                                <button className="btn btn-warning">Nhắn tin</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                                Contact
                            </Link>
                        </li>
                        <div className="dropdown">
                                    <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span>Admin</span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <Link className="text-decoration-none dropdown-item" to={`/logout`}>
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
