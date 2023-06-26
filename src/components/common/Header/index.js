import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const [listService, setListService] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/service/list-service`)
            .then((response) => {
                const data = response.data;
                setListService(data);
            })
            .catch((error) => console.error);
    }, []);

    return (
        <div>
            {' '}
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope"></i>
                        <a href="mailto:contact@example.com">contact@example.com</a>
                        <i className="bi bi-phone"></i> +1 5589 55488 55
                    </div>
                    <div className="d-none d-lg-flex social-links align-items-center">
                        <Link className="twitter">
                            <i className="bi bi-twitter"></i>
                        </Link>
                        <Link className="facebook">
                            <i className="bi bi-facebook"></i>
                        </Link>
                        <Link className="instagram">
                            <i className="bi bi-instagram"></i>
                        </Link>
                        <Link className="linkedin">
                            <i class="bi bi-linkedin"></i>
                        </Link>
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

                            <li className="dropdown">
                                <Link>
                                    <span>Doctors</span> <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link as={Link} to="/doctors" className="nav-link scrollto">
                                            Information Doctors
                                        </Link>
                                        <Link as={Link} to="/createDoc" className="nav-link scrollto">
                                            Create Doctor
                                        </Link>
                                    </li>
                                    <li>
                                        <Link as={Link} to="/editDoc" className="nav-link scrollto">
                                            Edit Doctor
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <Link>
                                    <span>Patient</span> <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link as={Link} to="/patient" className="nav-link scrollto">
                                            Create
                                        </Link>
                                    </li>
                                    <li>
                                        <Link as={Link} to="/editPatient" className="nav-link scrollto">
                                            Edit Patient
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <Link>
                                    <span>Service Medical</span> <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li className="dropdown">
                                        <Link>
                                            <span>Dịch vụ Đông y</span> <i className="bi bi-chevron-right"></i>
                                        </Link>
                                        <ul>
                                            {listService.map((service) => (
                                              service.typeService === 1 &&(  <Link key={service.idService} as={Link} to={`/service/${service.idService}`}>
                                                    <span>{service.nameService}</span>
                                                </Link>)
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <Link>
                                            <span>Dịch vụ Tây y</span> <i className="bi bi-chevron-right"></i>
                                        </Link>
                                        <ul>
                                            {listService.map((service) => (
                                              service.typeService === 2 &&(  <Link key={service.idService} to={`/service/${service.idService}`}>
                                                    <span>{service.nameService}</span>
                                                </Link>)
                                            ))}
                                        </ul>
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
