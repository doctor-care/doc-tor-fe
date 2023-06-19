import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            {' '}
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope"></i> <a href="mailto:contact@example.com">contact@example.com</a>
                        <i className="bi bi-phone"></i> +1 5589 55488 55
                    </div>
                    <div class="d-none d-lg-flex social-links align-items-center">
                        <a href="#" className="twitter">
                            <i class="bi bi-twitter"></i>
                        </a>
                        <a href="#" className="facebook">
                            <i class="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="instagram">
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="linkedin">
                            <i class="bi bi-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto">
                        <a href="index.html">Medilab</a>
                    </h1>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li>
                                <Link as={Link} to="/" className="nav-link scrollto active">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link as={Link} to="/about" className="nav-link scrollto">
                                    about
                                </Link>
                            </li>
                            <li>
                                <Link as={Link} to="/services" className="nav-link scrollto">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <a className="nav-link scrollto" href="#departments">
                                    Departments
                                </a>
                            </li>
                            <li>
                                <Link as={Link} to="/doctors" className="nav-link scrollto">
                                    Doctors
                                </Link>
                            </li>
                            <li className="dropdown">
                                <a href="#">
                                    <span>Drop Down</span> <i class="bi bi-chevron-down"></i>
                                </a>
                                <ul>
                                    <li>
                                        <a href="#">Drop Down 1</a>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#">
                                            <span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i>
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="#">Deep Drop Down 1</a>
                                            </li>
                                            <li>
                                                <a href="#">Deep Drop Down 2</a>
                                            </li>
                                            <li>
                                                <a href="#">Deep Drop Down 3</a>
                                            </li>
                                            <li>
                                                <a href="#">Deep Drop Down 4</a>
                                            </li>
                                            <li>
                                                <a href="#">Deep Drop Down 5</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Drop Down 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Drop Down 3</a>
                                    </li>
                                    <li>
                                        <a href="#">Drop Down 4</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className="nav-link scrollto" href="#contact">
                                    Contact
                                </a>
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                    <a href="#appointment" className="appointment-btn scrollto">
                        <Link as={Link} to="/appointments" className="nav-link scrollto">
                            <span className="d-none d-md-inline">Make an</span> Appointment
                        </Link>
                    </a>
                </div>
            </header>
            \
        </div>
    );
}

export default Header;
